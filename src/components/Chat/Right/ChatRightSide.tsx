import { ArrowBack } from "@mui/icons-material";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { theme } from "../../../utils/theme";
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
        sx={{ bgcolor: "#069ebf", borderRadius: "3px 8px 3px 3px" }}
      >
        {sm && <ArrowBack onClick={handleClick} sx={{ color: "white" }} />}
        <Typography
          sx={{
            bgcolor: "white",
            color: "#047891",
            padding: "0 10px",
            borderRadius: "15px",
          }}
        >
          {user.displayName ? user.displayName : "Choose user"}
        </Typography>
      </Box>
      <Box
        className="scrollContainer"
        bgcolor="#e3f6fa"
        overflow="auto"
        flex="1"
        padding="15px"
      >
        {data.chatId && <ChatMessages />}
      </Box>
      <Stack bgcolor="#e3f6fa" >{data.chatId && <SendMessageInput />}</Stack>
    </Stack>
  );
};

export default ChatRightSide;
