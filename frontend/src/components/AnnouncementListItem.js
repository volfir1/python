
// AnnouncementListItem.js
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  Typography,
  Box,
  alpha,
} from '@mui/material';

const AnnouncementListItem = ({ announcement }) => {
  const formatDate = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return 'Recently';
    }
  };

  return (
    <Card
      sx={{
        p: 2,
        background: (theme) => alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        border: '1px solid',
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
        transition: 'all 200ms ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => `0 8px 16px ${alpha(theme.palette.text.primary, 0.06)}`,
          borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
        },
      }}
    >
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 0.5,
          }}
        >
          {announcement.title}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            mb: 1,
          }}
        >
          {formatDate(announcement.created_at)}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {announcement.content}
        </Typography>
      </Box>
    </Card>
  );
};

export default AnnouncementListItem;