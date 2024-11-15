import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Skeleton,
} from "@mui/material";
import {
  ThumbsUp,
  MoreVertical,
} from "lucide-react";

import Comment from "../components/Comment";
import Layout from "../components/Layout";
import AuthContext from "../context/AuthContext";
import { capitalize } from "../utils/helpers";

const Post = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const { user } = useContext(AuthContext);
  const params = useParams();

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/forum/${params.id}/comment`, {
        text: comment,
        user: user.user_id,
      });
      setComment("");
      setComments((prevComments) => [res.data, ...prevComments]);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/forum/${params.id}`);
        setPost(res.data);
        setComments(res.data.comment_set);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [params]);

  if (isLoading) {
    return (
      <Layout>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Card sx={{ p: 3 }}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="text" width="20%" />
          </Card>
        </Box>
      </Layout>
    );
  }

  if (!post) {
    return null;
  }

  let date_posted_formatted = formatDistanceToNow(new Date(post.date_posted));
  date_posted_formatted = capitalize(date_posted_formatted);

  return (
    <Layout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Post Card */}
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  background: (theme) => 
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              >
                {post.user.first_name[0]}
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {date_posted_formatted} ago by{" "}
                  <Link
                    to={`/${post.user.enrollment_number}`}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {post.user.first_name}
                  </Link>
                </Typography>
              </Box>
            </Box>
            
            <IconButton onClick={handleMenuOpen} size="small">
              <MoreVertical size={20} />
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
              <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
              <MenuItem onClick={handleMenuClose}>Report</MenuItem>
            </Menu>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {post.title}
          </Typography>
          <Typography paragraph color="text.secondary" sx={{ mb: 2 }}>
            {post.text}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton size="small">
              <ThumbsUp size={20} />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {post.likes}
            </Typography>
          </Box>
        </Card>

        {/* Comment Form */}
        <Card sx={{ p: 3 }}>
          <form onSubmit={addComment}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={!comment.trim()}
                sx={{
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              >
                Comment
              </Button>
            </Box>
          </form>
        </Card>

        {/* Comments List */}
        {comments.length > 0 && (
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </Box>
          </Card>
        )}
      </Box>
    </Layout>
  );
};

export default Post;