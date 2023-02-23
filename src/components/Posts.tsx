import { Box } from "@mui/material";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { usePosts } from "../hooks/usePosts";
import Post from "./Post";

const Posts: React.FC = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) return <>Loading...</>;

  if (!posts) {
    return <>Loading...</>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10px"
      margin="0 auto"
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
