import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  alpha,
  Alert,
  CircularProgress,
} from "@mui/material";

import Layout from "../components/Layout";
import AuthContext from "../context/AuthContext";

// Validation schema
const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  text: Yup.string()
    .min(10, 'Content must be at least 10 characters')
    .max(5000, 'Content must be less than 5000 characters'),
});

const CreatePost = () => {
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null);
      await axios.post("/api/forum/", {
        title: values.title,
        text: values.text,
        user: user.user_id,
      });
      navigate("/forum");
    } catch (err) {
      console.error("Error creating post:", err);
      setSubmitError(err.response?.data?.message || 'Failed to create post. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          width: "100%",
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Guidelines Section */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            background: (theme) => alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ 
            p: 2, 
            background: (theme) => alpha(theme.palette.primary.main, 0.03),
            borderBottom: '1px solid',
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Posting Guidelines
            </Typography>
          </Box>
          
          <Box sx={{ p: 2 }}>
            <Box sx={{ 
              display: 'grid', 
              gap: 1.5,
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
              }}>
                • Keep it relevant to the course or academic discussion
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
              }}>
                • Be respectful and constructive in your posts
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
              }}>
                • Provide clear and concise information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
              }}>
                • Review your post before submitting
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Create Post Form */}
        <Card
          component={Paper}
          elevation={0}
          sx={{
            background: (theme) => alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(10px)",
            border: "1px solid",
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Create a Post
            </Typography>

            {submitError && (
              <Alert 
                severity="error" 
                sx={{ mb: 3 }}
                onClose={() => setSubmitError(null)}
              >
                {submitError}
              </Alert>
            )}

            <Formik
              initialValues={{
                title: '',
                text: '',
              }}
              validationSchema={PostSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, dirty, isValid }) => (
                <Form>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Field name="title">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Title"
                          placeholder="What's your post about?"
                          variant="outlined"
                          required
                          error={meta.touched && !!meta.error}
                          helperText={meta.touched && meta.error}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "background.paper",
                              transition: "all 0.2s ease-in-out",
                              "&:hover": {
                                backgroundColor: (theme) =>
                                  alpha(theme.palette.primary.main, 0.02),
                              },
                              "&.Mui-focused": {
                                backgroundColor: (theme) =>
                                  alpha(theme.palette.primary.main, 0.02),
                              },
                            },
                          }}
                        />
                      )}
                    </Field>

                    <Field name="text">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Content"
                          placeholder="Share your thoughts..."
                          multiline
                          rows={6}
                          variant="outlined"
                          error={meta.touched && !!meta.error}
                          helperText={meta.touched && meta.error}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              backgroundColor: "background.paper",
                              transition: "all 0.2s ease-in-out",
                              "&:hover": {
                                backgroundColor: (theme) =>
                                  alpha(theme.palette.primary.main, 0.02),
                              },
                              "&.Mui-focused": {
                                backgroundColor: (theme) =>
                                  alpha(theme.palette.primary.main, 0.02),
                              },
                            },
                          }}
                        />
                      )}
                    </Field>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => navigate("/forum")}
                        disabled={isSubmitting}
                        sx={{
                          px: 3,
                          py: 1,
                          textTransform: "none",
                          borderRadius: 1,
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || !dirty || !isValid}
                        sx={{
                          px: 3,
                          py: 1,
                          minWidth: 120,
                          textTransform: "none",
                          borderRadius: 1,
                          background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-1px)",
                          },
                          "&:active": {
                            transform: "translateY(0)",
                          },
                        }}
                      >
                        {isSubmitting ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Create Post"
                        )}
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Card>
      </Box>
    </Layout>
  );
};

export default CreatePost;