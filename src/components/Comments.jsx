import { Avatar, Box, Stack, Typography, styled } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import Comment from "./Comment";

const CommentsSection = styled(Stack)(({ theme }) => ({
  gap: "20px",
}));

const Comments = ({ comments, limit }) => {
  if (!comments) return <>Loading...</>;

  return (
    <CommentsSection>
      {comments.slice(0, limit).map((com, i) => (
        <Comment com={com} key={i} />
      ))}
    </CommentsSection>
  );
};

export default Comments;
