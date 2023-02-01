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

import { usePosts } from "../hooks/posts";
import Post from "./Post";

const Posts: React.FC = () => {
  const dispatch = useDispatch();

  const { posts, isLoading } = usePosts();

  if (isLoading) return <>Loading...</>;

  if (!posts) {
    return <>Loading...</>;
  }

  return (
    <Box display="flex" flexDirection="column" gap="10px">
      {posts.map((post) => (
        <Post
          author={post.author}
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
