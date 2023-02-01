import { Search, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ChatUsers from "./ChatUsers";

const SearchUserInput = styled(TextField)(({ theme }) => ({
  padding: "0",
  margin: "0",
}));

const ChatLeftSide: React.FC = () => {
  return (
    <Stack padding="0" height="100%">
      <Box borderBottom="1px solid rgba(50, 50, 50, .2)" padding="10px">
        <Typography>Messaging</Typography>
      </Box>
      <Box padding="10px">
        <SearchUserInput
          placeholder="search users"
          sx={{
            [`& fieldset`]: {
              borderRadius: 100,
            },
          }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box overflow="auto">
        <ChatUsers />
      </Box>
    </Stack>
  );
};

export default ChatLeftSide;
