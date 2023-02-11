import { uuidv4 } from "@firebase/util";
import { Image, Send } from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { useAppSelector } from "../hooks/redux-hooks";
import ChatMessages from "./ChatMessages";
import SendMessageInput from "./SendMessageInput";

const ChatRightSide: React.FC = () => {
  const user: any = useAppSelector((state) => state.chat.user);
  const data = useAppSelector((state) => state.chat);

  return (
    <Stack height="100%">
      <Box
        borderBottom="1px solid rgba(50, 50, 50, .2)"
        padding="10px"
        display="flex"
        justifyContent="space-between"
      >
        <Typography>
          {user.displayName ? user.displayName : "chose User"}
        </Typography>
        <Typography color="gray">Online</Typography>
      </Box>
      <Box overflow="auto" flex="1" padding="15px">
        {data.chatId && <ChatMessages />}
      </Box>
      {data.chatId && <SendMessageInput />}
    </Stack>
  );
};

export default ChatRightSide;
