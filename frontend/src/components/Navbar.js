import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
  Tooltip,
  Alert,
  Snackbar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Bell,
  Home,
  MessageCircle,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    background: alpha(theme.palette.primary.main, 0.08),
  },
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: "white",
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications");
        setNotifications(res.data);
        const unreadCount = res.data.filter(notif => !notif.is_seen).length;
        setUnreadNotifications(unreadCount);
      } catch (err) {
        setError("Failed to fetch notifications");
        console.error("Failed to fetch notifications:", err);
      }
    };
    
    if (user) {
      fetchNotifications();
      // Set up polling for new notifications
      const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifAnchorEl(null);
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.post("/api/notifications/mark-all-read");
      setNotifications(prevNotifications =>
        prevNotifications.map(notif => ({ ...notif, is_seen: true }))
      );
      setUnreadNotifications(0);
    } catch (err) {
      setError("Failed to mark notifications as read");
    }
  };

  const handleErrorClose = () => {
    setError(null);
  };

  const capitalize = (str) => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderNotificationContent = (notif) => (
    <MenuItem
      key={notif.id}
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 0.5,
        py: 1.5,
        px: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: !notif.is_seen ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
        '&:hover': {
          bgcolor: alpha(theme.palette.primary.main, 0.04),
        },
      })}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 0.5 
        }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontWeight: !notif.is_seen ? 600 : 400,
            }}
          >
            {notif.title || 'New Notification'}
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ ml: 2, flexShrink: 0 }}
          >
            {new Date(notif.created_at || notif.timestamp).toLocaleString([], {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {notif.content || notif.message}
        </Typography>
        {notif.action_url && (
          <Link
            to={notif.action_url}
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            <Typography
              variant="caption"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                mt: 0.5,
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              })}
            >
              View Details
            </Typography>
          </Link>
        )}
      </Box>
    </MenuItem>
  );

  const renderNotificationsMenu = () => (
    <StyledMenu
      anchorEl={notifAnchorEl}
      open={Boolean(notifAnchorEl)}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 320,
          maxHeight: 400,
          overflowY: 'auto',
        },
      }}
    >
      {notifications && notifications.length > 0 ? (
        [
          ...notifications.map(renderNotificationContent),
          <Box 
            key="mark-all-read"
            sx={{ 
              p: 1.5, 
              textAlign: 'center',
              borderTop: (theme) => `1px solid ${theme.palette.divider}`
            }}
          >
            <Button
              size="small"
              onClick={handleMarkAllAsRead}
              sx={{ textTransform: 'none' }}
            >
              Mark all as read
            </Button>
          </Box>
        ]
      ) : (
        <MenuItem disabled sx={{ py: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No notifications
          </Typography>
        </MenuItem>
      )}
    </StyledMenu>
  );

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ 
        justifyContent: "space-between", 
        px: { xs: 2, sm: 4, md: 8 },
        py: 1.5,
      }}>
        {/* Logo & Navigation */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <GradientText variant="h5">LMS</GradientText>
          </Link>
          
          <Box sx={{ display: "flex", gap: 2 }}>
            {user && (
              <NavButton
                startIcon={<Home size={18} />}
                component={Link}
                to="/"
                active={isActive("/")}
              >
                Home
              </NavButton>
            )}
            <NavButton
              startIcon={<MessageCircle size={18} />}
              component={Link}
              to="/forum"
              active={isActive("/forum")}
            >
              Forum
            </NavButton>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton onClick={handleNotificationClick}>
                  <NotificationBadge badgeContent={unreadNotifications} max={99}>
                    <Bell size={20} />
                  </NotificationBadge>
                </IconButton>
              </Tooltip>

              {/* Profile Menu */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  onClick={handleProfileClick}
                  sx={{
                    textTransform: "none",
                    color: "text.primary",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                  endIcon={<ChevronDown size={16} />}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      mr: 1,
                      background: (theme) => 
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }}
                  >
                    {user.first_name[0]}
                  </Avatar>
                  {capitalize(user.first_name)}
                </Button>
              </Box>

              {/* Profile Dropdown */}
              <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 180,
                  },
                }}
              >
                <MenuItem component={Link} to={`/${user?.enrollment_number}`}>
                  <ListItemIcon>
                    <User size={18} />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem component={Link} to="/settings">
                  <ListItemIcon>
                    <Settings size={18} />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={logoutUser}>
                  <ListItemIcon>
                    <LogOut size={18} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </StyledMenu>

              {/* Notifications Dropdown */}
              {renderNotificationsMenu()}
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                background: (theme) => 
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                textTransform: "none",
                "&:hover": {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>

        {/* Error Snackbar */}
        <Snackbar 
          open={Boolean(error)} 
          autoHideDuration={6000} 
          onClose={handleErrorClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert 
            onClose={handleErrorClose} 
            severity="error" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;