import { Box } from "@mui/material";
import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Feed = () => {
  return (
    <Box>
      <CreatePost />
      <Posts />
    </Box>
  );
};

export default Feed;
