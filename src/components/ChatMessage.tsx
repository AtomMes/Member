import { Stack, Box, Avatar, Typography } from "@mui/material";
import React from "react";

const ChatMessage: React.FC = () => {
  return (
    <Stack flexDirection="row" gap="10px">
      <Box>
        <Avatar />
      </Box>
      <Stack
        gap="8px"
        bgcolor="#f3f2ef"
        padding="8px"
        borderRadius="10px"
        width="100%"
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography>Vahe Muradyan</Typography>
          <Typography fontSize="14px" color="gray">
            10 minutes ago
          </Typography>
        </Stack>
        <Typography color="#585858">
          Barev dzez dzer cv karox eq uxarkel es hascein
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatMessage;
