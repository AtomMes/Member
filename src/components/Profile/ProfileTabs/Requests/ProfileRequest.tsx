import { Check, Delete, PersonAdd, PersonOff } from "@mui/icons-material";
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { getUserData } from "../../../../hooks/getUserData";
import { getMutualConnections } from "../../../../hooks/useMutualConnections";
import { connectBack, declineRequest } from "../../../../utils/connectionFunctions";
import { theme } from "../../../../utils/theme";
import CurrentUserAvatar from "../../../Shared/CurrentUserAvatar";

interface Props {
  request: string;
}

const ProfileRequest: React.FC<Props> = ({ request }) => {
  const { userData, loading } = getUserData(request);

  const { mutualContacts } = getMutualConnections(request);

  const ut = useMediaQuery(theme.breakpoints.down(850));

  if (!userData)
    return (
      <>
        {/*@ts-ignore */}
        <Grid item xs={ut ? 12 : 6} sx={{ xs: 12 }} display="flex">
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
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                animation="wave"
              />
            </Box>
            <Stack justifyContent="center" flex="1">
              <Typography variant="body1" width="100%">
                <Skeleton variant="text" width="100px" animation="wave" />
              </Typography>
              <Typography
                sx={{
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                <Skeleton variant="text" width="200px" animation="wave" />
              </Typography>
            </Stack>
            <Skeleton
              variant="rectangular"
              width="40px"
              height="25px"
              sx={{ borderRadius: "20px" }}
              animation="wave"
            />
          </Paper>
        </Grid>
      </>
    );

  return (
    <Grid item xs={ut ? 12 : 6} sx={{ xs: 12 }} display="flex">
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
            {mutualContacts.length} mutual contacts
          </Typography>
        </Stack>
        <PersonAdd
          color="success"
          onClick={() => connectBack(userData.id)}
          sx={{ marginRight: "5px" }}
        />
        <PersonOff color="error" onClick={() => declineRequest(userData.id)} />
      </Paper>
    </Grid>
  );
};

export default ProfileRequest;
