import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { Box, Stack } from "@mui/material";

const Home = () => {
  return (
    <Stack display="flex" flexDirection="row" justifyContent='space-between' >
      <Sidebar />
      <Feed />
      <Rightbar />
    </Stack>
  );
};

export default Home;
