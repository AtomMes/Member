import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";

const ChatPage: React.FC = () => {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  if (!isAuth) navigate("/login");

  return (
    <Stack display="flex" flexDirection="row">
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Chat />
        </Grid>
        <Grid item xs={3}>
          mnacacnel stex
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ChatPage;
