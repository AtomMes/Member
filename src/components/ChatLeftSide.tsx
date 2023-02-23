import { Search, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
  useMediaQuery,
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
import { theme } from "../utils/theme";
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

interface Props {
  handleClick: () => void;
  isDrawerOpen: boolean;
}

const ChatLeftSide: React.FC<Props> = ({ handleClick, isDrawerOpen }) => {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);

  const { userData } = getUserData(auth.currentUser!.uid);

  const sm = useMediaQuery(theme.breakpoints.down(600));

  const currentUser = auth.currentUser;

  if (!userData) return <>Loading</>;

  return (
    <Stack
      position="relative"
      padding="0"
      height="100%"
      borderRight="1px solid rgba(50, 50, 50, .2)"
      sx={{ width: sm ? 0 : 400 }}
    >
      {sm ? (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={handleClick}
          sx={{ position: "absolute" }}
          PaperProps={{ style: { width: "100%" } }}
        >
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
              <Box onClick={handleClick}>
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
              </Box>
            </Stack>
          </Box>
        </Drawer>
      ) : (
        <>
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
              <Box onClick={handleClick}>
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
              </Box>
            </Stack>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default ChatLeftSide;
