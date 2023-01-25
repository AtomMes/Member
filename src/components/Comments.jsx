import { Avatar, Box, Stack, Typography, styled } from "@mui/material";
import React from "react";

const CommentsSection = styled(Stack)(({ theme }) => ({
  gap: "20px",
}));

const Comments = () => {
  const coms = [1, 2, 3];

  return (
    <CommentsSection>
      {coms.map((com) => (
        <Stack flexDirection="row" gap="10px" key={com}>
          <Box>
            <Avatar>AM</Avatar>
          </Box>
          <Stack gap="8px" bgcolor="#f3f2ef" padding="8px" borderRadius="10px">
            <Typography>Atom Mesropyan</Typography>
            <Typography color="#585858">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
              nisi, nihil quis sapiente quisquam exercitationem?
            </Typography>
          </Stack>
        </Stack>
      ))}
    </CommentsSection>
  );
};

export default Comments;
