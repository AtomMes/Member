import { Stack, styled } from "@mui/material";
import React from "react";
import Comment from "./Comment";

const CommentsSection = styled(Stack)(({ theme }) => ({
  gap: "20px",
}));

interface Props {
  comments: Array<{
    authorId: string;
    comment: string;
    date: Date;
  }> | null;
  limit?: number;
}

const Comments: React.FC<Props> = ({ comments, limit }) => {
  if (!comments) return <></>;

  return (
    <CommentsSection>
      {comments.slice(0, limit).map((com, i) => (
        <Comment com={com} key={i} />
      ))}
    </CommentsSection>
  );
};

export default Comments;
