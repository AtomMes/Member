import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CurrentUserAvatar from "./CurrentUserAvatar";
import { ChatType } from "./ChatLeftSide";
import { setChat } from "../redux/chatSlice/slice";
import { useAppDispatch } from "../hooks/redux-hooks";

interface Props {
  chat: any;
}

const ChatUser: React.FC<Props> = ({ chat }) => {
  const dispatch = useAppDispatch();

  console.log(chat[1].userInfo.displayName);

  return (
    <Stack
      flexDirection="row"
      padding="10px"
      gap="5px"
      width="100%"
      sx={{ boxSizing: "border-box" }}
      onClick={() => dispatch(setChat(chat[1].userInfo))}
    >
      <CurrentUserAvatar
        username={chat[1].userInfo.displayName}
        photoURL={chat[1].userInfo.photoURL}
      />
      <Stack width="100%">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{chat[1].userInfo.displayName}</Typography>
          <Typography fontSize="14px" sx={{ whiteSpace: "nowrap" }}>
            Jan 26
          </Typography>
        </Stack>
        <Typography color="gray" fontSize="14px">
          {chat[1].lastMessage?.text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatUser;
