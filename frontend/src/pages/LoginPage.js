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

// Styled Components remain the same
const LoginCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "440px",
  borderRadius: "1rem",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
}));

const StyledForm = styled(Form)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

// Simplified Validation Schema
const LoginSchema = Yup.object().shape({
  enrollment_number: Yup.string()
    .required('Enrollment number is required'),
  password: Yup.string()
    .required('Password is required'),
});

// Custom TextField component remains the same
const CustomTextField = ({ field, form: { touched, errors }, ...props }) => (
  <TextField
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
        // Log the values being sent
        console.log("Sending login data:", {
            enrollment_number: values.enrollment_number,
            password: values.password
        });

        const event = {
            preventDefault: () => {},
            target: {
                enrollment_number: { value: values.enrollment_number },
                password: { value: values.password },
            },
        };

        // Log the actual event being sent
        console.log("Login event:", event);
        
        await loginUser(event);
        navigate("/dashboard");
    } catch (err) {
        console.error("Login error:", err.response?.data);  // Log the error response
        if (err.response?.data) {
            const { data } = err.response;
            if (data.detail) {
                setError(data.detail);
            } else if (data.enrollment_number) {
                setFieldError("enrollment_number", data.enrollment_number);
            } else if (data.password) {
                setFieldError("password", data.password);
            } else {
                setError(JSON.stringify(data));  // Show the raw error data
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
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f6f7ff 0%, #f0f2ff 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <LoginCard elevation={0}>
        <CardContent 
          sx={{ 
            padding: 4,
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
              background: "#bbb",
              borderRadius: "4px",
              "&:hover": {
                background: "#999",
              },
            },
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 600,
                background: "linear-gradient(120deg, #3a86ff, #8338ec)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
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
                  component={CustomTextField}
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
                  component={CustomTextField}
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
                  sx={{
                    mt: 2,
                    height: 48,
                    background: "linear-gradient(135deg, #3a86ff 0%, #8338ec 100%)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2872ff 0%, #7229dd 100%)",
                    },
                  }}
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
                  <Link
                    to="/forgot-password"
                    style={{ 
                      color: "#3a86ff",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
                  >
                    Forgot Password?
                  </Link>
                  <Link
                    to="/register"
                    style={{ 
                      color: "#3a86ff",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                    }}
                  >
                    Create Account
                  </Link>
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