import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const ChatUser: React.FC = () => {
  return (
    <Stack flexDirection="row" padding="10px" gap="5px">
      <Avatar sx={{ width: "50px", height: "50px" }} />
      <Stack>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Username user</Typography>
          <Typography fontSize="14px" sx={{ whiteSpace: "nowrap" }}>
            Jan 26
          </Typography>
        </Stack>
        <Typography color="gray" fontSize="14px">
          last message with this user
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatUser;
