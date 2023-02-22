import { Check, Delete, Message } from "@mui/icons-material";
import {
  Grid,
  Paper,
  Avatar,
  Stack,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { getUserData } from "../hooks/getUserData";
import CurrentUserAvatar from "./CurrentUserAvatar";
import { onClickTypes } from "./RightBar";

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
            sx={{ color: "gray" }}
            onClick={() =>
              onClick("", id, userData.username, userData.photoURL)
            }
          />
        </Box>
      ) : (
        <>
          <Box onClick={() => onClick("y", id)}>
            <Check color="success" />
          </Box>
          <Box onClick={() => onClick("n", id)}>
            <Delete color="error" />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default RightbarRequestContact;
