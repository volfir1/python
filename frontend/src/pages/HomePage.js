// HomePage.js
import React from 'react';
import { Typography, Box, Alert } from '@mui/material';
import Layout from "../components/Layout";
import CourseList from "../components/CourseList";

const HomePage = () => {
  return (
    <Layout>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          maxWidth: '1280px',
          mx: 'auto',
          width: '100%',
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
          }}
        >
          Dashboard
        </Typography>

        <CourseList />
      </Box>  
    </Layout>
  );
};

export default HomePage;