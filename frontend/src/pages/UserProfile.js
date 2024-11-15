import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
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
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Calendar,
  GraduationCap,
  User,
} from 'lucide-react';

// Simplified styled components using theme
const InfoCard = ({ icon: Icon, title, value }) => {
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
        <Typography variant="subtitle1">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const UserProfile = () => {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/users/${params.user}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => alert(err));
  }, [params]);

  useEffect(() => {
    axios
      .get(`/api/courses`)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <Layout title="Profile">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
          }}
        >
          <CircularProgress 
            sx={{ 
              color: theme.palette.primary.main,
            }} 
          />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Profile">
      <Box
        sx={{
          minHeight: '100vh',
          p: 3,
          background: theme.palette.background.gradient,
        }}
      >
        <Grid container spacing={3}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: { xs: 'center', md: 'flex-start' } }}>
                  <Avatar 
                    sx={{ 
                      width: 120, 
                      height: 120,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      fontSize: theme.typography.h3.fontSize,
                      fontWeight: theme.typography.h3.fontWeight,
                    }}
                  >
                    {user.user.first_name[0]}
                    {user.user.last_name[0]}
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
                      {`${user.user.first_name} ${user.user.last_name}`}
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={12} md={4}>
                        <InfoCard 
                          icon={GraduationCap} 
                          title="Batch" 
                          value={user.batch.name} 
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <InfoCard 
                          icon={User} 
                          title="Student ID" 
                          value={user.user.enrollment_number} 
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <InfoCard 
                          icon={Calendar} 
                          title="Joined" 
                          value={new Date(user.user.date_joined).toLocaleDateString()} 
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Courses Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography 
                    variant="h5"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Enrolled Courses
                  </Typography>
                  <Chip 
                    label={`${courses.length} Courses`}
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
                          <TableCell align="center">
                            <Chip 
                              size="small"
                              label="Active"
                              sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
    </Layout>
  );
};

export default UserProfile;