import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { getUserData } from "../hooks/getUserData";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setChat } from "../redux/chatSlice/slice";
import CurrentUserAvatar from "./CurrentUserAvatar";

interface Props {
  chat: any;
}

const ChatUser: React.FC<Props> = ({ chat }) => {
  const { userData, loading } = getUserData(chat[1].userInfo.uid);

  const dispatch = useAppDispatch();

  const onUserClick = () => {
    dispatch(
      setChat({
        displayName: userData!.username,
        photoURL: userData!.photoURL,
        uid: userData!.id,
      })
    );
  };

  if (!userData)
    return (
      <Stack
        flexDirection="row"
        padding="10px"
        gap="5px"
        width="100%"
        sx={{ boxSizing: "border-box" }}
        onClick={onUserClick}
        height="100%"
        alignItems="center"
      >
        <Box>
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation="wave"
          />
        </Box>
        <Stack width="100%" height="100%">
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography alignSelf="center">
              <Skeleton variant="text" width="100px" animation="wave" />
            </Typography>
            {chat[1].lastMessage?.text && (
              <Typography fontSize="14px" sx={{ whiteSpace: "nowrap" }}>
                <Skeleton variant="text" width="60px" animation="wave" />
              </Typography>
            )}
          </Stack>
          <Typography color="gray" fontSize="14px">
            <Skeleton variant="text" width="150px" animation="wave" />
          </Typography>
        </Stack>
      </Stack>
    );

  return (
    <Stack
      flexDirection="row"
      padding="10px"
      gap="5px"
      width="100%"
      sx={{ boxSizing: "border-box" }}
      onClick={onUserClick}
      height="100%"
      alignItems="center"
    >
      <CurrentUserAvatar
        username={userData!.username}
        size="50px"
        photoURL={userData!.photoURL}
        id={userData!.id}
        disableNav
      />
      <Stack width="100%" height="100%">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography alignSelf="center">{userData!.username}</Typography>
          {chat[1].lastMessage?.text && (
            <Typography fontSize="14px" sx={{ whiteSpace: "nowrap" }}>
              {chat[1].date &&
                formatDistanceToNow(chat[1].date).replace("less than a", "") +
                  " " +
                  "ago"}
            </Typography>
          )}
        </Stack>
        <Typography color="gray" fontSize="14px">
          {chat[1].lastMessage?.text
            ? chat[1].lastMessage?.text.substring(0, 30)
            : ""}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatUser;
