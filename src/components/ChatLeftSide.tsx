import { Search, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import {
  getDocs,
  query,
  collection,
  where,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import { createChat } from "../utils/chatFunctions";
import ChatContactsSearch from "./ChatContactsSearch";
import ChatUser from "./ChatUser";
import ChatUsers from "./ChatUsers";

const SearchUserInput = styled(TextField)(({ theme }) => ({
  padding: "0",
  margin: "0",
}));

export interface ChatType {
  userInfo: {
    username: string;
    photoURL: string;
    id: string;
  };
}

const ChatLeftSide: React.FC = () => {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);

  const { userData } = getUserData(auth.currentUser!.uid);

  const currentUser = auth.currentUser;

  if (!userData) return <>Loading</>;

  return (
    <Stack padding="0" height="100%" width="100%">
      <Box borderBottom="1px solid rgba(50, 50, 50, .2)" padding="10px">
        <Typography>Messaging</Typography>
      </Box>
      <Box padding="10px">
        <SearchUserInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="search contacts"
          sx={{
            [`& fieldset`]: {
              borderRadius: 100,
            },
            width: "100%",
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
      <Box overflow="auto" width="100%">
        <Stack
          gap="3px"
          divider={<Divider orientation="horizontal" flexItem />}
          width="100%"
        >
          {username &&
            userData.contacts.map((contact: string) => (
              <ChatContactsSearch
                key={contact}
                userId={contact}
                setUsername={setUsername}
                inputValue={username}
              />
            ))}
          <ChatUsers />
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChatLeftSide;
