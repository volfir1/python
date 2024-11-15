import React from 'react';
import { Box, Typography, Divider, alpha } from '@mui/material';
import Announcements from './Announcements';
import TimeTableList from './TimeTableList';

const Sidebar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        p: { xs: 2, sm: 3 },
        borderLeft: '1px solid',
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        height: '100%',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          background: (theme) => 
            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        Explore
      </Typography>

      <TimeTableList />
      
      <Divider 
        sx={{ 
          my: 2,
          borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        }} 
      />
      
      <Announcements />
    </Box>
  );
};

export default Sidebar;