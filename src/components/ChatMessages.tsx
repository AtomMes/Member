//@ts-nocheck
import { Stack } from "@mui/material";
import { onSnapshot, doc } from "firebase/firestore";
import React from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAppSelector } from "../hooks/redux-hooks";
import ChatMessage from "./ChatMessage";

const ChatMessages: React.FC = () => {
  const [messages, setMessages] = React.useState([]);

  const data = useAppSelector((state) => state.chat);

  React.useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <Stack gap="15px">
      {messages.map((message) => (
        <ChatMessage message={message} key={message} />
      ))}
    </Stack>
  );
};

export default ChatMessages;
