import { Stack, Box, Avatar, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import { useAppSelector } from "../hooks/redux-hooks";
import { Message } from "./ChatMessages";
import CurrentUserAvatar from "./CurrentUserAvatar";

interface Props {
  message: Message;
}
const ChatMessage: React.FC<Props> = ({ message }) => {
  const { userData, loading } = getUserData(message.senderId);

  const data: any = useAppSelector((state) => state.chat);

  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const createdDate = formatDistanceToNow(message.date) + " " + "ago";

  const navigate = useNavigate();

  if (!userData) return <>Loading...</>;

  return (
    <Stack ref={ref} flexDirection="row" gap="10px">
      <Box onClick={() => navigate(`/profile/${message.senderId}`)}>
        <CurrentUserAvatar
          username={userData.username}
          photoURL={userData.photoURL}
          id={userData.id}
        />
      </Box>
      <Stack
        gap="8px"
        bgcolor="#f3f2ef"
        padding="8px"
        minWidth="250px"
        borderRadius="10px"
        width="fit-content"
      >
        <Stack flexDirection="row" justifyContent="space-between">
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
        <Typography color="#585858">{message.text}</Typography>
      </Stack>
    </Stack>
  );
};

export default ChatMessage;
