import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  TextField,
  Typography,
  Skeleton,
  Button,
  IconButton,
  InputAdornment,
  Fade,
  alpha,
} from "@mui/material";
import { Edit, Plus, MessageSquare } from "lucide-react";
import Layout from "../components/Layout";
import PostListItem from "../components/PostListItem";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/forum");
      setPosts(res.data);
    } catch (err) {
      setError("Failed to load forum posts");
      console.error("Error fetching posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleCreatePost = () => {
    navigate("/forum/create");
  };

  // Loading skeleton for posts
  const PostSkeleton = () => (
    <Card sx={{ p: 3 }}>
      <Skeleton variant="text" width="30%" height={24} />
      <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
      <Skeleton variant="text" width="60%" height={20} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Skeleton variant="text" width="20%" height={20} />
        <Skeleton variant="text" width="15%" height={20} />
      </Box>
    </Card>
  );

  return (
    <Layout title="Forum">
      <Box sx={{ maxWidth: "800px", mx: "auto", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Create Post Card */}
          <Card
            sx={{
              p: 3,
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: (theme) => 
                  `0 12px 24px ${alpha(theme.palette.text.primary, 0.08)}`,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                fullWidth
                placeholder="What's on your mind?"
                onClick={handleCreatePost}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Edit size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        startIcon={<Plus size={18} />}
                        onClick={handleCreatePost}
                        sx={{
                          borderRadius: "8px",
                          textTransform: "none",
                        }}
                      >
                        Create Post
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  },
                }}
              />
            </Box>
          </Card>

          {/* Forum Stats */}
          <Card sx={{ p: 3, mb: 2 }}>
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center" 
            }}>
              <Typography variant="h6" sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1 
              }}>
                <MessageSquare size={24} />
                Forum Discussions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </Typography>
            </Box>
          </Card>

          {/* Posts List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {isLoading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : error ? (
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Typography color="error">{error}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={getAllPosts}
                  sx={{ mt: 2 }}
                >
                  Retry
                </Button>
              </Card>
            ) : posts.length === 0 ? (
              <Card sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No posts yet
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Be the first to start a discussion
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  onClick={handleCreatePost}
                >
                  Create Post
                </Button>
              </Card>
            ) : (
              <Fade in timeout={500}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {posts.map((post) => (
                    <PostListItem key={post.id} post={post} />
                  ))}
                </Box>
              </Fade>
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Forum;