import { Box, Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../hooks/getUserData";
import CurrentUserAvatar from "./CurrentUserAvatar";

interface CommentProps {
  com: {
    authorId: string;
    comment: string;
    date: Date;
  };
}

const Comment: React.FC<CommentProps> = ({ com }) => {
  const navigate = useNavigate();

  const { userData, loading } = getUserData(com.authorId);
  if(!userData) return  <></>

  return (
    <Stack flexDirection="row" gap="10px">
      <Box onClick={() => navigate(`/profile/${com.authorId}`)}>
        <CurrentUserAvatar
          username={userData.username}
          photoURL={userData.photoURL}
          id={userData.id}
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
          <Typography>{userData!.username}</Typography>
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
