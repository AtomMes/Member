import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CurrentUserAvatar from "./CurrentUserAvatar";
import { ChatType } from "./ChatLeftSide";
import { setChat } from "../redux/chatSlice/slice";
import { useAppDispatch } from "../hooks/redux-hooks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { formatDistanceToNow } from "date-fns";

interface Props {
  chat: any;
}

const ChatUser: React.FC<Props> = ({ chat }) => {
  const dispatch = useAppDispatch();



  // const createdDate =
  //   chat[1].date && formatDistanceToNow(chat[1].date) + " " + "ago";

  const [postAuthorPhoto, setPostAuthorPhoto] = React.useState<string | null>(
    ""
  );
  const [postAuthorName, setPostAuthorName] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", chat[1].userInfo.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        setPostAuthorPhoto(docSnap.data()!.photoURL);
        setPostAuthorName(docSnap.data()!.username);
      }
    })();
  }, [chat[1].userInfo.uid]);

  return (
    <Stack
      flexDirection="row"
      padding="10px"
      gap="5px"
      width="100%"
      sx={{ boxSizing: "border-box" }}
      onClick={() => dispatch(setChat(chat[1].userInfo))}
    >
      <CurrentUserAvatar username={postAuthorName} photoURL={postAuthorPhoto} />
      <Stack width="100%">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{postAuthorName}</Typography>
          <Typography fontSize="14px" sx={{ whiteSpace: "nowrap" }}>
            erbeq
          </Typography>
        </Stack>
        <Typography color="gray" fontSize="14px">
          {chat[1].lastMessage?.text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatUser;
