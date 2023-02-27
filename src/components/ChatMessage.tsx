import { Box, Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
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

  if (!userData) return <></>;


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
        bgcolor="#f0fafc"
        padding="8px"
        borderRadius="10px"
        width="fit-content"
      >
        <Stack flexDirection="row" justifyContent="space-between" gap="20px">
          <Typography>{userData.username}</Typography>
          <Typography fontSize="14px" color="gray">
            {createdDate.replace("less than a", "")}
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
    </Stack>
  );
};

export default ChatMessage;
