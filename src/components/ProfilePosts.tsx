import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useAuthorPosts } from "../hooks/useAuthorPosts";
import Post from "./Post";

const ProfilePosts: React.FC = () => {
  const { id } = useParams();
  const { authorPosts, isLoading } = useAuthorPosts(id!);


  if (!authorPosts) return <>Loading...</>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10px"
      margin="0 auto"
      width="600px"
      maxWidth="100%"
    >
      {authorPosts.map((post) => (
        <Post
          authorId={post.authorId}
          image={post.image}
          text={post.text}
          date={post.date}
          id={post.id}
          likes={post.likes}
          key={post.id}
          del={true}
        />
      ))}
    </Box>
  );
};

export default ProfilePosts;
