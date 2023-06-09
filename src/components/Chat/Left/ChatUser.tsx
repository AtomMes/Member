import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { getUserData } from "../../../hooks/getUserData";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { setChat } from "../../../redux/chatSlice/slice";
import CurrentUserAvatar from "../../Shared/CurrentUserAvatar";
import { getDate } from "../../../utils/getDate";
import ChatUserSkeleton from "./ChatUserSkeleton";

interface Props {
  chat: any;
}

const ChatUser: React.FC<Props> = ({ chat }) => {
  const { userData, loading } = getUserData(chat[1].userInfo.uid);

  const user: any = useAppSelector((state) => state.chat.user);
  const createdDate = getDate(chat[1].date);

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

  const lastMessage = chat[1].lastMessage?.text
    ? chat[1].lastMessage?.text.substring(0, 30)
    : "";

  if (!userData) return <ChatUserSkeleton />;

  return (
    <Stack
      flexDirection="row"
      padding="10px"
      gap="5px"
      width="100%"

      sx={{
        boxSizing: "border-box",
        backgroundColor:
          chat[1].userInfo.uid === user.uid ? "#046a80" : "initial",
      }}
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
          <Typography
            alignSelf="center"
            sx={{
              color: chat[1].userInfo.uid === user.uid ? "white" : "initial",
            }}
          >
            {userData!.username}
          </Typography>
          {chat[1].lastMessage?.text && (
            <Typography
              fontSize="14px"
              sx={{
                whiteSpace: "nowrap",
                color: chat[1].userInfo.uid === user.uid ? "lightGray" : "gray",
              }}
            >
              {createdDate}
            </Typography>
          )}
        </Stack>
        <Typography
          color="gray"
          fontSize="14px"
          sx={{
            color: chat[1].userInfo.uid === user.uid ? "white" : "gray",
          }}
        >
          {lastMessage}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatUser;
