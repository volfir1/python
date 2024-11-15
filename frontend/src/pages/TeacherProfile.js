// TeacherProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Divider,
} from '@mui/material';
import {
  BookOpen,
  Users,
  Award,
  Clock,
  Calendar,
  GraduationCap,
  User,
} from 'lucide-react';

const InfoCard = ({ icon: Icon, title, value, description }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.primary.lighter}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: theme.palette.primary.lighter,
          transform: 'translateY(-2px)',
        }
      }}
    >
      <Box
        sx={{
          p: 1,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }}
      >
        <Icon size={20} color="white" />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
          {value}
        </Typography>
        {description && (
          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const TeacherProfile = ({ userData }) => {
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    yearsOfTeaching: 0,
  });

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const [coursesRes, statsRes] = await Promise.all([
          axios.get(`/api/courses?teacher=${userData.user.id}`),
          axios.get(`/api/teacher-stats/${userData.user.id}`),
        ]);
        setCourses(coursesRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error('Error fetching teacher data:', err);
      }
    };

    fetchTeacherData();
  }, [userData]);

  return (
    <Box sx={{ minHeight: '100vh', p: 3, background: theme.palette.background.gradient }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 3, 
                alignItems: { xs: 'center', md: 'flex-start' } 
              }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    fontSize: theme.typography.h3.fontSize,
                    fontWeight: theme.typography.h3.fontWeight,
                  }}
                >
                  {userData.user.first_name[0]}
                  {userData.user.last_name[0]}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h4" 
                    gutterBottom
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {`${userData.user.first_name} ${userData.user.last_name}`}
                  </Typography>
                  
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {userData.department} • Faculty Member
                  </Typography>

                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={3}>
                      <InfoCard 
                        icon={BookOpen} 
                        title="Courses" 
                        value={stats.totalCourses}
                        description="Active courses" 
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InfoCard 
                        icon={Users} 
                        title="Students" 
                        value={stats.totalStudents}
                        description="Currently teaching" 
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InfoCard 
                        icon={Award} 
                        title="Experience" 
                        value={`${stats.yearsOfTeaching} Years`}
                        description="Of teaching" 
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <InfoCard 
                        icon={Calendar} 
                        title="Joined" 
                        value={new Date(userData.user.date_joined).toLocaleDateString()}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Teaching Courses */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3 
              }}>
                <Typography 
                  variant="h5"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Teaching Courses
                </Typography>
                <Chip 
                  label={`${courses.length} Active Courses`}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: 'white',
                  }}
                />
              </Box>

              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                        Course Code
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                        Course Name
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                        Students
                      </TableCell>
                      <TableCell align="center" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.code}>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {course.code}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {course.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {course.enrolled_students} students
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            size="small"
                            label={course.status || 'Active'}
                            sx={{
                              background: course.status === 'Completed' 
                                ? theme.palette.success.light
                                : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              color: 'white',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherProfile;