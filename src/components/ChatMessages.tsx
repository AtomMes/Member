import { Stack } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../firebase";
import { useAppSelector } from "../hooks/redux-hooks";
import ChatMessage from "./ChatMessage";

export interface Message {
  senderId: string;
  text: string;
  img?: string;
  date: Date;
}

const ChatMessages: React.FC = () => {
  const [messages, setMessages] = React.useState([]);

  const data = useAppSelector((state) => state.chat);

  React.useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data!.chatId), (doc: any) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <Stack gap="15px">
      {messages.map((message: Message, i: any) => (
        <ChatMessage message={message} key={i} />
      ))}
    </Stack>
  );
};

export default ChatMessages;
