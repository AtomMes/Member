import { Stack, Box, Avatar, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase";
import { useAppSelector } from "../hooks/redux-hooks";
import { Message } from "./ChatMessages";
import CurrentUserAvatar from "./CurrentUserAvatar";

interface Props {
  message: Message;
}
const ChatMessage: React.FC<Props> = ({ message }) => {
  const [userImage, setUserImage] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", message.senderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        setUserImage(docSnap.data()!.photoURL);
        setUserName(docSnap.data()!.username);
      }
    })();
  }, [message.senderId]);

  const data: any = useAppSelector((state) => state.chat);

 

  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <Stack ref={ref} flexDirection="row" gap="10px">
      <Box>
        <CurrentUserAvatar username={userName} photoURL={userImage} />
      </Box>
      <Stack
        gap="8px"
        bgcolor="#f3f2ef"
        padding="8px"
        borderRadius="10px"
        width="fit-content"
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography>{userName}</Typography>
          <Typography fontSize="14px" color="gray">
            10 minutes ago
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
