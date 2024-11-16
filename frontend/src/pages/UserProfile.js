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
import {
  Calendar,
  GraduationCap,
  User,
} from 'lucide-react';
import { styled } from '@mui/material/styles';

// Styled Components
const ProfileCard = styled(Card)(({ theme }) => ({
  borderRadius: '1rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
}));

const GradientTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  background: 'linear-gradient(120deg, #3a86ff, #8338ec)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  '& .MuiTableHead-root': {
    '& .MuiTableCell-head': {
      fontWeight: 600,
      background: 'linear-gradient(120deg, #3a86ff, #8338ec)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
}));

const InfoCard = ({ icon: Icon, title, value }) => (
  <Box className="flex items-center gap-3 p-4 rounded-lg bg-white/50 border border-white/80">
    <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value}
      </Typography>
    </div>
  </Box>
);

const UserProfile = () => {
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
        <Box className="flex items-center justify-center h-[80vh]">
          <CircularProgress 
            sx={{ 
              background: 'linear-gradient(120deg, #3a86ff, #8338ec)',
              borderRadius: '50%',
            }} 
          />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Profile">
      <Box className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <Grid container spacing={3}>
          {/* Profile Header */}
          <Grid item xs={12}>
            <ProfileCard>
              <CardContent className="p-6">
                <Box className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar 
                    sx={{ 
                      width: 120, 
                      height: 120,
                      background: 'linear-gradient(120deg, #3a86ff, #8338ec)',
                    }}
                  >
                    {user.user.first_name[0]}
                    {user.user.last_name[0]}
                  </Avatar>
                  <Box className="flex-1 text-center md:text-left">
                    <div>
                      <GradientTypography variant="h4" gutterBottom>
                        {`${user.user.first_name} ${user.user.last_name}`}
                      </GradientTypography>
                    </div>
                    <Box className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InfoCard 
                        icon={GraduationCap} 
                        title="Batch" 
                        value={user.batch.name} 
                      />
                      <InfoCard 
                        icon={User} 
                        title="Student ID" 
                        value={user.user.enrollment_number} 
                      />
                      <InfoCard 
                        icon={Calendar} 
                        title="Joined" 
                        value={new Date(user.user.date_joined).toLocaleDateString()} 
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </ProfileCard>
          </Grid>

          {/* Courses Section */}
          <Grid item xs={12}>
            <ProfileCard>
              <CardContent className="p-6">
                <Box className="flex items-center justify-between mb-6">
                  <GradientTypography variant="h5">
                    Enrolled Courses
                  </GradientTypography>
                  <Chip 
                    label={`${courses.length} Courses`}
                    sx={{
                      background: 'linear-gradient(120deg, #3a86ff, #8338ec)',
                      color: 'white',
                    }}
                  />
                </Box>
                <StyledTableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Course Code</TableCell>
                        <TableCell>Course Name</TableCell>
                        <TableCell align="center">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.code}>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
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
                                background: 'linear-gradient(120deg, #3a86ff, #8338ec)',
                                color: 'white',
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
              </CardContent>
            </ProfileCard>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default UserProfile; 