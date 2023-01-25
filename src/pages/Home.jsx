import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { Box, Grid, Stack } from "@mui/material";

const Home = () => {
  return (
    <Stack display="flex" flexDirection="row">
      <Grid container spacing={3}>
        <Grid
          item
          xs={3}
        >
          <Sidebar />
        </Grid>
        <Grid item xs={6}>
          <Feed />
        </Grid>
        <Grid item xs={3}>
          <Rightbar />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
