import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { getUserData } from "../../../hooks/getUserData";
import { Message } from "./ChatMessages";
import CurrentUserAvatar from "../../Shared/CurrentUserAvatar";
import { getDate } from "../../../utils/getDate";

interface Props {
  message: Message;
}
const ChatMessage: React.FC<Props> = ({ message }) => {
  const { userData, loading } = getUserData(message.senderId);
  const createdDate = getDate(message.date);
  const ref = React.useRef<HTMLElement>(null);

  const navigate = useNavigate();
  if (!userData) return <></>;

  return (
    <Stack
      ref={ref}
      flexDirection="row"
      gap="10px"
      sx={{
        alignSelf: message.senderId !== auth.currentUser!.uid ? "end" : "start",
      }}
    >
      {message.senderId === auth.currentUser!.uid && (
        <Box onClick={() => navigate(`/profile/${message.senderId}`)}>
          <CurrentUserAvatar
            username={userData.username}
            photoURL={userData.photoURL}
            id={userData.id}
          />
        </Box>
      )}
      <Stack
        gap="8px"
        bgcolor="white"
        padding="8px"
        borderRadius="10px"
        width="fit-content"
      >
        <Stack flexDirection="row" justifyContent="space-between" gap="20px">
          <Typography>{userData.username}</Typography>
          <Typography fontSize="14px" color="gray">
            {createdDate}
          </Typography>
        </Stack>
        {message.img && (
          <Box>
            <img
              src={message.img}
              alt="photo"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          </Box>
        )}
        <Typography color="#585858" sx={{ overflowWrap: "anywhere" }}>
          {message.text}
        </Typography>
      </Stack>
      {message.senderId !== auth.currentUser!.uid && (
        <Box onClick={() => navigate(`/profile/${message.senderId}`)}>
          <CurrentUserAvatar
            username={userData.username}
            photoURL={userData.photoURL}
            id={userData.id}
          />
        </Box>
      )}
    </Stack>
  );
};

export default ChatMessage;
