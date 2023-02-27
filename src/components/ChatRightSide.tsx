import { ArrowBack } from "@mui/icons-material";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/redux-hooks";
import { theme } from "../utils/theme";
import ChatMessages from "./ChatMessages";
import SendMessageInput from "./SendMessageInput";

interface Props {
  handleClick: () => void;
}

const ChatRightSide: React.FC<Props> = ({ handleClick }) => {
  const user: any = useAppSelector((state) => state.chat.user);
  const data = useAppSelector((state) => state.chat);
  const sm = useMediaQuery(theme.breakpoints.down(600));

  return (
    <Stack height="100%" width="100%" maxWidth="800px">
      <Box
        borderBottom="1px solid rgba(50, 50, 50, .2)"
        padding="10px"
        display="flex"
        justifyContent="space-between"
      >
        {sm && <ArrowBack onClick={handleClick} />}
        <Typography>
          {user.displayName ? user.displayName : "choose User"}
        </Typography>
      </Box>
      <Box overflow="auto" flex="1" padding="15px">
        {data.chatId && <ChatMessages />}
      </Box>
      {data.chatId && <SendMessageInput />}
    </Stack>
  );
};

export default ChatRightSide;
