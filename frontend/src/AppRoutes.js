import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/404";
import CreatePost from "./pages/CreatePost";
import Forum from "./pages/Forum";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Post from "./pages/Post";
import UserProfile from "./pages/UserProfile";
import PrivateRoute from "./utils/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      
      <Route path="/forum" element={<Forum />} />
      
      <Route
        path="/forum/:id"
        element={
          <PrivateRoute>
            <Post />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/forum/create"
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/:user"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;