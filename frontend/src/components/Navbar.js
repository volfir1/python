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
  borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
}));

const GradientText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  background: "linear-gradient(120deg, #3a86ff, #8338ec)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? "#3a86ff" : "#666",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    background: alpha("#3a86ff", 0.08),
  },
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    background: "linear-gradient(135deg, #3a86ff, #8338ec)",
    color: "white",
  },
}));

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications");
        setNotifications(res.data);
        const unreadCount = res.data.filter(notif => !notif.isSeen).length;
        setUnreadNotifications(unreadCount);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    
    if (user) {
      fetchNotifications();
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

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4, md: 8 } }}>
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
                    "&:hover": { background: alpha("#3a86ff", 0.08) },
                  }}
                  endIcon={<ChevronDown size={16} />}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      mr: 1,
                      background: "linear-gradient(135deg, #3a86ff, #8338ec)",
                    }}
                  >
                    {user.first_name[0]}
                  </Avatar>
                  {user.first_name}
                </Button>
              </Box>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #3a86ff 0%, #8338ec 100%)",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(135deg, #2872ff 0%, #7229dd 100%)",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>

        {/* Profile Dropdown Menu */}
        <Menu
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
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
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
        </Menu>

        {/* Notifications Menu */}
        <Menu
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
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <MenuItem
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  py: 1,
                  px: 2,
                  backgroundColor: notif.isSeen ? "transparent" : alpha("#3a86ff", 0.08),
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: notif.isSeen ? 400 : 600 }}>
                  {notif.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(notif.timestamp).toLocaleString()}
                </Typography>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No notifications</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;