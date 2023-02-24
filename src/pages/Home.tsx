import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import RightBar from "../components/RightBar";
import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { theme } from "../utils/theme";

const Home: React.FC = () => {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  if (!isAuth) navigate("/login");

  const ut = useMediaQuery(theme.breakpoints.down(850));

  return (
    <Stack display="flex" flexDirection="row">
      <Grid container spacing={3}>
        <Grid
          item
          xs={3}
          sx={{
            display: {
              md: "initial",
              xs: "none",
            },
          }}
        >
          <Sidebar />
        </Grid>
        {/*@ts-ignore */}
        <Grid item xs={ut ? 12 : 6} sx={{ xs: 12, margin: "0 auto" }}>
          <Feed />
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: {
              md: "initial",
              xs: "none",
            },
          }}
        >
          <RightBar />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
