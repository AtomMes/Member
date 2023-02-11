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
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
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
  const [user, setUser] = useState<any>(null);
  const [err, setErr] = useState(false);

  const currentUser = auth.currentUser;

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("username", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        //@ts-ignore
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: any) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser!.uid > user.id
        ? currentUser!.uid + user.id
        : user.id + currentUser!.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser!.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.id,
            displayName: user.username,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.id), {
          [combinedId + ".userInfo"]: {
            uid: currentUser!.uid,
            displayName: currentUser!.displayName,
            photoURL: currentUser!.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  return (
    <Stack padding="0" height="100%" width="100%">
      <Box borderBottom="1px solid rgba(50, 50, 50, .2)" padding="10px">
        <Typography>Messaging</Typography>
      </Box>
      <Box padding="10px">
        <SearchUserInput
          onKeyDown={handleKey}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="search users"
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
          {err && <>User not found</>}
          {user && (
            <Stack
              flexDirection="row"
              padding="10px"
              gap="5px"
              width="100%"
              sx={{ boxSizing: "border-box" }}
              alignItems="center"
              marginBottom="20px"
              onClick={handleSelect}
            >
              <Avatar
                sx={{ width: "50px", height: "50px" }}
                src={user.photoURL}
              />
              <Typography>{user.username}</Typography>
            </Stack>
          )}
          <ChatUsers />
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChatLeftSide;
