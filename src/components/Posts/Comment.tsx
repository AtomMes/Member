import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../hooks/getUserData";
import CurrentUserAvatar from "../Shared/CurrentUserAvatar";
import { getDate } from "../../utils/getDate";

interface CommentProps {
  com: {
    authorId: string;
    comment: string;
    date: Date;
  };
}

const Comment: React.FC<CommentProps> = ({ com }) => {
  const navigate = useNavigate();
  const createdDate = getDate(com.date);
  const { userData, loading } = getUserData(com.authorId);
  if (!userData) return <></>;
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
        bgcolor="#f0fafc"
        padding="8px"
        borderRadius="10px"
        width="100%"
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography>{userData!.username}</Typography>
          <Typography fontSize="14px" color="gray">
            {" "}
            {createdDate}
          </Typography>
        </Stack>
        <Typography color="#585858">{com.comment}</Typography>
      </Stack>
    </Stack>
  );
};

export default Comment;
