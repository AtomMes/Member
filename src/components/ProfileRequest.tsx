import { Check, Delete } from "@mui/icons-material";
import { Grid, Paper, Avatar, Stack, Typography, Box } from "@mui/material";
import React from "react";
import { getUserData } from "../hooks/getUserData";
import { connectBack, declineRequest } from "../utils/connectionFunctions";
import CurrentUserAvatar from "./CurrentUserAvatar";

interface Props {
  request: string;
}

const ProfileRequest: React.FC<Props> = ({ request }) => {
  const { userData, loading } = getUserData(request);

  if (loading) return <>Loading...</>;
  if (!userData) return <>Loading...</>;

  return (
    <Grid item xs={6} display="flex">
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          bgcolor: "white",
          padding: "15px",
        }}
      >
        <Box marginRight="10px">
          <CurrentUserAvatar
            size="50px"
            username={userData.username}
            photoURL={userData.photoURL}
            id={userData.id}
          />
        </Box>
        <Stack justifyContent="center" flex="1">
          <Typography>{userData.username}</Typography>
          <Typography
            sx={{
              color: "gray",
              fontSize: "14px",
              width: "fit-content",
              height: "fit-content",
            }}
          >
            3 mutual connections
          </Typography>
        </Stack>
        <Check color="success" onClick={() => connectBack(userData.id)} />
        <Delete color="error" onClick={() => declineRequest(userData.id)} />
      </Paper>
    </Grid>
  );
};

export default ProfileRequest;
