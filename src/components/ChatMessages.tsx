import { Stack } from "@mui/material";
import React from "react";
import ChatMessage from "./ChatMessage";

const ChatMessages: React.FC = () => {
  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9,10];

  return (
    <Stack gap="15px">
      {messages.map((message) => (
        <ChatMessage key={message} />
      ))}
    </Stack>
  );
};

export default ChatMessages;
