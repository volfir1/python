// pages/UnauthorizedPage.js
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)', // Subtract navbar height
        padding: theme.spacing(3),
      })}
    >
      <Card 
        sx={(theme) => ({
          maxWidth: 400,
          width: '100%',
          borderRadius: theme.shape.borderRadius * 2,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.primary.lighter}`,
        })}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <AlertTriangle 
            size={64} 
            style={{ 
              marginBottom: '1rem',
              color: '#ff4444'
            }} 
          />
          <Typography 
            variant="h4" 
            gutterBottom
            sx={(theme) => ({
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            })}
          >
            Access Denied
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{ mb: 3 }}
          >
            You don't have permission to access this page.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={(theme) => ({
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              },
            })}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UnauthorizedPage;