import { Divider, Stack } from "@mui/material";
import React from "react";
import ChatUser from "./ChatUser";

const ChatUsers: React.FC = () => {
  const users: number[] = [1, 3, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <Stack gap="3px" divider={<Divider orientation="horizontal" flexItem />}>
      {users.map((user: number) => (
        <ChatUser key={user} />
      ))}
    </Stack>
  );
};

export default ChatUsers;
