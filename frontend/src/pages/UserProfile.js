// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import StudentProfile from './StudentProfile';
import TeacherProfile from './TeacherProfile';
import {
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${params.user}`);
        setUserData(res.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params]);

  if (loading) {
    return (
      <Layout title="Profile">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Profile">
        <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
          {error}
        </Alert>
      </Layout>
    );
  }

  // Render appropriate profile based on user role
  return (
    <Layout title="Profile">
      {userData.user.is_staff ? (
        <TeacherProfile userData={userData} />
      ) : (
        <StudentProfile userData={userData} />
      )}
    </Layout>
  );
};

export default UserProfile;

