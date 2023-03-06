import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "../hooks/getUserData";
import { useAppDispatch } from "../hooks/redux-hooks";
import { setChat } from "../redux/chatSlice/slice";

interface Props {
  userId: string;
  setUsername: (arg1: string) => void;
  inputValue: string;
}

const ChatContactsSearch: React.FC<Props> = ({
  userId,
  setUsername,
  inputValue,
}) => {
  const { userData } = getUserData(userId);
  const dispatch = useAppDispatch();

  const onUserClick = () => {
    dispatch(
      setChat({
        displayName: userData!.username,
        photoURL: userData!.photoURL,
        uid: userData!.id,
      })
    );
  };

  if (!userData) return <></>;
  if (!userData.searchUsername.includes(inputValue.toLowerCase()))
    return <Box display="none">aa</Box>;

  return (
    <Stack
      flexDirection="row"
      padding="10px"
      gap="5px"
      width="100%"
      sx={{ boxSizing: "border-box" }}
      alignItems="center"
      onClick={() => {
        setUsername("");
        onUserClick();
      }}
    >
      <Avatar sx={{ width: "50px", height: "50px" }} src={userData.photoURL} />
      <Typography>{userData.username}</Typography>
    </Stack>
  );
};

export default ChatContactsSearch;
