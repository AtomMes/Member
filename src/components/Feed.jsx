import { Box, Stack } from "@mui/material";
import React from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Feed = () => {
  return (
    <Stack gap="5px" marginTop="20px">
      <CreatePost />
      <Posts />
    </Stack>
  );
};

export default Feed;
