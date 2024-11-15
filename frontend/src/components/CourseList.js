// CourseList.js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Typography,
  Grid,
  Skeleton,
  alpha,
  Alert,
} from "@mui/material";
import AuthContext from "../context/AuthContext";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/courses", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        });
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [authTokens.access]);

  // Loading skeleton
  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <Skeleton 
          variant="text" 
          width="200px" 
          height={40} 
          sx={{ mb: 3 }}
        />
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card
                sx={{
                  p: 3,
                  height: '100%',
                  background: (theme) => alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Skeleton variant="text" width="30%" height={24} />
                <Skeleton variant="text" width="80%" height={32} sx={{ mt: 1 }} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          maxWidth: 'sm',
          mx: 'auto',
          mt: 4,
        }}
      >
        {error}
      </Alert>
    );
  }

  // Empty state
  if (courses.length === 0) {
    return (
      <Card
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 'sm',
          mx: 'auto',
          mt: 4,
          background: (theme) => alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(8px)',
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No courses available
        </Typography>
        <Typography color="text.secondary">
          You haven't been assigned to any courses yet.
        </Typography>
      </Card>
    );
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: 'text.primary',
        }}
      >
        Your Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.code}>
            <Card
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: (theme) => alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(8px)',
                border: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                transition: 'all 200ms ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => 
                    `0 12px 24px ${alpha(theme.palette.text.primary, 0.08)}`,
                  borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  mb: 1,
                  fontSize: '0.875rem',
                }}
              >
                {course.code}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  lineHeight: 1.3,
                }}
              >
                {course.name}
              </Typography>

              {course.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {course.description}
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;