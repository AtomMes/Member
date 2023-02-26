import { Box } from "@mui/material";
import React from "react";

import { usePosts } from "../hooks/usePosts";
import Post from "./Post";

const Posts: React.FC = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) return <></>;

  if (!posts) {
    return <></>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10px"
      margin="0 auto"
      sx={{ width: "100%" }}
    >
      {posts.map((post) => (
        <Post
          authorId={post.authorId}
          image={post.image}
          text={post.text}
          date={post.date}
          id={post.id}
          likes={post.likes}
          key={post.id}
        />
      ))}
    </Box>
  );
};

export default Posts;
