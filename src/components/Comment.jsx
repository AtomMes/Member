import { Avatar, Box, Stack, Typography, styled } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase";
import CurrentUserAvatar from "./CurrentUserAvatar";

const Comment = ({ com }) => {
  const [postAuthorPhoto, setPostAuthorPhoto] = React.useState(null);
  const [postAuthorName, setPostAuthorName] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", com.author.id);
      const docSnap = await getDoc(docRef);
      setPostAuthorPhoto(docSnap.data().photoURL);
      setPostAuthorName(docSnap.data().username);
    })();
  }, []);

  return (
    <Stack flexDirection="row" gap="10px">
      <Box>
        <CurrentUserAvatar
          username={postAuthorName}
          photoURL={postAuthorPhoto}
        />
      </Box>
      <Stack
        gap="8px"
        bgcolor="#f3f2ef"
        padding="8px"
        borderRadius="10px"
        width="100%"
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography>{com.author.name}</Typography>
          <Typography fontSize="14px" color="gray">
            {" "}
            {(formatDistanceToNow(com.date) + " " + "ago").replace("about", "")}
          </Typography>
        </Stack>
        <Typography color="#585858">{com.comment}</Typography>
      </Stack>
    </Stack>
  );
};

export default Comment;
