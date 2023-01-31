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

const Posts = () => {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const { posts, isLoading } = usePosts();

  if (isLoading) return <>Loading...</>;

  return (
    <Box display="flex" flexDirection="column" gap="10px">
      {posts.map((post, i) => (
        <Post {...post} key={i} />
      ))}
    </Box>
  );
};

export default Posts;
