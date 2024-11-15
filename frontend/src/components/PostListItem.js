import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import {
  Box,
  Card,
  Typography,
  IconButton,
  Avatar,
  alpha,
} from '@mui/material';
import { ThumbsUp, MessageCircle } from 'lucide-react';

const PostListItem = ({ post }) => {
  const { id, title, text, date_posted, user, likes } = post;

  const formatDate = (date) => {
    try {
      const formattedDate = formatDistanceToNow(new Date(date));
      return `${formattedDate} ago`;
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Recently';
    }
  };

  return (
    <Card
      component={Link}
      to={`/forum/${id}`}
      sx={{
        p: 3,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 200ms ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => 
            `0 12px 24px ${alpha(theme.palette.text.primary, 0.08)}`,
        },
      }}
    >
      {/* Author and Date */}
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={user?.avatar_url}
          alt={user?.first_name}
          sx={{
            width: 32,
            height: 32,
            background: (theme) => 
              `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          {user?.first_name?.[0] || '?'}
        </Avatar>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          {formatDate(date_posted)} by{' '}
          <Link
            to={`/${user.enrollment_number}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {user.first_name}
          </Link>
        </Typography>
      </Box>

      {/* Post Content */}
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontSize: '1.125rem',
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {title}
      </Typography>
      
      <Typography
        color="text.secondary"
        sx={{
          mb: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {text}
      </Typography>

      {/* Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle like action
            }}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <ThumbsUp size={20} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {likes}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <MessageCircle size={20} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default PostListItem;