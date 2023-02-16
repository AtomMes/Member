import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CurrentUserAvatar from "./CurrentUserAvatar";
import { ChatType } from "./ChatLeftSide";
import { setChat } from "../redux/chatSlice/slice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { formatDistanceToNow } from "date-fns";
import { getUserData } from "../hooks/getUserData";

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

  if (!userData) return <>Loading...</>;
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
          {chat[1].lastMessage.text && (
            <Typography fontSize="14px" sx={{ whiteSpace: "nowrap" }}>
              {chat[1].date && formatDistanceToNow(chat[1].date) + " " + "ago"}
            </Typography>
          )}
        </Stack>
        {chat[1].lastMessage.text && (
          <Typography color="gray" fontSize="14px">
            {chat[1].lastMessage.text}aa
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default ChatUser;
