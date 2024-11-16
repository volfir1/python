// AuthContext.js
import { useState, useEffect, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const storedAuthTokens = localStorage.getItem("authTokens");
  
  const [authTokens, setAuthTokens] = useState(() =>
    storedAuthTokens ? JSON.parse(storedAuthTokens) : null
  );
  const [user, setUser] = useState(() =>
    storedAuthTokens ? jwtDecode(storedAuthTokens) : null
  );
  
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/token/", {
        enrollment_number: e.target.enrollment_number.value,
        password: e.target.password.value,
      });

      const data = response.data;
      setAuthTokens(data);
      const decodedUser = jwtDecode(data.access);
      setUser(decodedUser);
      localStorage.setItem("authTokens", JSON.stringify(data));

      // Set default auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

      // Redirect based on user type
      if (decodedUser.user_type === 'T') {
        navigate("/teacher/profile");
      } else if (decodedUser.user_type === 'S') {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    delete axios.defaults.headers.common['Authorization'];
    navigate("/login");
  }, [navigate]);

  // Update token function
  const updateToken = useCallback(async () => {
    if (!authTokens?.refresh) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/users/token/refresh/", {
        refresh: authTokens.refresh,
      });

      const data = response.data;
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      
      // Update auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
    } catch (error) {
      console.error("Token refresh error:", error);
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  }, [authTokens, loading, logoutUser]);

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, 1000 * 60 * 4); // 4 minutes

    return () => clearInterval(interval);
  }, [authTokens, loading, updateToken]);

  const contextData = {
    authTokens,
    user,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};