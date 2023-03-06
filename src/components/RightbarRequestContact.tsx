import {
  Check,
  Delete,
  Message,
  PersonAdd,
  PersonOff,
} from "@mui/icons-material";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { getUserData } from "../hooks/getUserData";
import CurrentUserAvatar from "./CurrentUserAvatar";

interface Props {
  onClick: (
    r: string,
    id: string,
    username?: string | undefined,
    photoURL?: string | undefined
  ) => void;
  isContact: boolean;
  id: string;
}

const RightbarRequestContact: React.FC<Props> = ({
  onClick,
  isContact,
  id,
}) => {
  const { userData, loading } = getUserData(id);

  if (!userData)
    return (
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "calc(100%-15px)",
          bgcolor: "white",
          margin: "7px 0",
        }}
      >
        <Box marginRight="5px">
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            animation="wave"
          />
        </Box>
        <Stack justifyContent="center" flex="1">
          <Typography variant="body1" width="100%">
            <Skeleton variant="text" width="100%" animation="wave" />
          </Typography>
        </Stack>
      </Stack>
    );

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "calc(100%-15px)",
        bgcolor: "white",
        margin: "7px 0",
      }}
    >
      <Box marginRight="5px">
        <CurrentUserAvatar
          size="40px"
          username={userData.username}
          photoURL={userData.photoURL}
          id={userData.id}
        />
      </Box>
      <Stack justifyContent="center" flex="1">
        <Typography>{userData!.username}</Typography>
      </Stack>
      {isContact ? (
        <Box>
          <Message
            // color="primary"
            sx={{ color: "#047891", marginRight: "6px" }}
            onClick={() =>
              onClick("", id, userData.username, userData.photoURL)
            }
          />
        </Box>
      ) : (
        <>
          <Box onClick={() => onClick("y", id)} marginRight="5px">
            <PersonAdd
              sx={{
                color: "#047891",
              }}
            />
          </Box>
          <Box onClick={() => onClick("n", id)}>
            <PersonOff
              sx={{
                color: "#ba2323",
              }}
            />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default RightbarRequestContact;
