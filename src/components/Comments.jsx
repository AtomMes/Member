import { Avatar, Box, Stack, Typography, styled } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import React from "react";

const CommentsSection = styled(Stack)(({ theme }) => ({
  gap: "20px",
}));

const Comments = ({ comments }) => {
  if (!comments) return <>Loading...</>;

  return (
    <CommentsSection>
      {comments.map((com, i) => (
        <Stack flexDirection="row" gap="10px" key={i}>
          <Box>
            <Avatar>
              {com.author.name
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </Avatar>
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
                {(formatDistanceToNow(com.date) + " " + "ago").replace(
                  "about",
                  ""
                )}
              </Typography>
            </Stack>
            <Typography color="#585858">{com.comment}</Typography>
          </Stack>
        </Stack>
      ))}
    </CommentsSection>
  );
};

export default Comments;
