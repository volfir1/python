// Announcements.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  Skeleton,
  Alert,
  alpha,
} from '@mui/material';
import AnnouncementListItem from './AnnouncementListItem';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('/api/announcements/');
        setAnnouncements(res.data);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <Skeleton 
          variant="text" 
          width="200px"
          height={32}
          sx={{ mb: 2 }}
        />
        {[1, 2, 3].map((index) => (
          <Card
            key={index}
            sx={{
              p: 2,
              mb: 2,
              background: (theme) => alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)',
            }}
          >
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </Card>
        ))}
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert 
        severity="error"
        sx={{
          background: (theme) => alpha(theme.palette.error.main, 0.1),
          color: 'error.main',
          border: '1px solid',
          borderColor: 'error.main',
        }}
      >
        {error}
      </Alert>
    );
  }

  // Empty state
  if (announcements.length === 0) {
    return (
      <Card
        sx={{
          p: 3,
          textAlign: 'center',
          background: (theme) => alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(8px)',
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          No announcements yet
        </Typography>
      </Card>
    );
  }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        Announcements
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {announcements.map((announcement) => (
          <AnnouncementListItem 
            key={announcement.id} 
            announcement={announcement} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default Announcements;
