import { Stack, Box, Avatar, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase";
import { useAppSelector } from "../hooks/redux-hooks";

interface Props {
  message: any;
}

const ChatMessage: React.FC<Props> = ({ message }) => {
  const [userImage, setUserImage] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");

  const currentUser = auth.currentUser;
  const data: any = useAppSelector((state) => state.chat);

  console.log(data);

  const ref: any = React.useRef();

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Stack ref={ref} flexDirection="row" gap="10px">
      <Box>
        <Avatar
          src={
            message.senderId === currentUser!.uid
              ? currentUser!.photoURL
              : data.user.photoURL
          }
        />
      </Box>
      <Stack
        gap="8px"
        bgcolor="#f3f2ef"
        padding="8px"
        borderRadius="10px"
        width="100%"
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography>
            {message.senderId === currentUser!.uid
              ? currentUser!.displayName
              : data.user.displayName}
          </Typography>
          <Typography fontSize="14px" color="gray">
            10 minutes ago
          </Typography>
        </Stack>
        <Typography color="#585858">{message.text}</Typography>
      </Stack>
    </Stack>
  );
};

export default ChatMessage;
