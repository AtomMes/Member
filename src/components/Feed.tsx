import { Stack } from "@mui/material";
import React from "react";
import { WrapperBox } from "../App";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Feed: React.FC = () => {
  return (
    <Stack
      gap="5px"
      marginTop="20px"
      width="100%"
      maxWidth="600px"
      margin="20px auto 0"
    >
      <WrapperBox>
        <CreatePost feed={true} />
      </WrapperBox>
      <Posts />
    </Stack>
  );
};

export default Feed;
