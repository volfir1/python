import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthContext from "../context/AuthContext";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Eye,
  EyeOff,
  UserCircle,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import { styled } from "@mui/material/styles";

// Using theme variables in styled components
const LoginCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "440px",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[1],
  background: theme.palette.background.paper,
  backdropFilter: "blur(10px)",
  border: `1px solid ${theme.palette.primary.lighter}`,
}));

const StyledForm = styled(Form)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

// Custom TextField styled with theme
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
  },
}));

const LoginSchema = Yup.object().shape({
  enrollment_number: Yup.string().required('Enrollment number is required'),
  password: Yup.string().required('Password is required'),
});

const FormTextField = ({ field, form: { touched, errors }, ...props }) => (
  <CustomTextField
    {...field}
    {...props}
    error={touched[field.name] && Boolean(errors[field.name])}
    helperText={touched[field.name] && errors[field.name]}
  />
);

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    enrollment_number: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setError(null);
    try {
      const event = {
        preventDefault: () => {},
        target: {
          enrollment_number: { value: values.enrollment_number },
          password: { value: values.password },
        },
      };
      
      await loginUser(event);
      
      // Navigation will be handled by the loginUser function in AuthContext
      // The loginUser function will check user type and redirect accordingly
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data) {
        const { data } = err.response;
        if (data.detail) {
          setError(data.detail);
        } else if (data.enrollment_number) {
          setFieldError("enrollment_number", data.enrollment_number);
        } else if (data.password) {
          setFieldError("password", data.password);
        } else {
          setError(JSON.stringify(data));
        }
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.background.gradient,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      })}
    >
      <LoginCard>
        <CardContent 
          sx={(theme) => ({ 
            padding: theme.spacing(4),
            height: "auto",
            maxHeight: "calc(100vh - 48px)",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme.palette.text.disabled,
              borderRadius: theme.shape.borderRadius,
              "&:hover": {
                background: theme.palette.text.secondary,
              },
            },
          })}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={(theme) => ({
                fontWeight: theme.typography.h4.fontWeight,
                background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              })}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please sign in to continue to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <StyledForm>
                <Field
                  name="enrollment_number"
                  component={FormTextField}
                  fullWidth
                  label="Enrollment Number"
                  placeholder="Enter your enrollment number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <UserCircle size={20} />
                      </InputAdornment>
                    ),
                  }}
                  disabled={isSubmitting}
                />

                <Field
                  name="password"
                  component={FormTextField}
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyRound size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  disabled={isSubmitting}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={(theme) => ({
                    mt: 2,
                    height: 48,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                    },
                  })}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={20} style={{ marginLeft: 8 }} />
                    </>
                  )}
                </Button>

                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  mt: 2,
                  gap: 2 
                }}>
                  
                
                </Box>
              </StyledForm>
            )}
          </Formik>
        </CardContent>
      </LoginCard>
    </Box>
  );
};

export default LoginPage;