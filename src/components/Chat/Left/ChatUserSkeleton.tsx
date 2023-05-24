import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";

const ChatUserSkeleton = () => {
  return (
    <Stack
      flexDirection="row"
      padding="10px"
      gap="5px"
      width="100%"
      sx={{ boxSizing: "border-box" }}
      height="100%"
      alignItems="center"
    >
      <Box>
        <Skeleton variant="circular" width={50} height={50} animation="wave" />
      </Box>
      <Stack width="100%" height="100%">
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography alignSelf="center">
            <Skeleton variant="text" width="100px" animation="wave" />
          </Typography>

          <Typography fontSize="14px" sx={{ whiteSpace: "nowrap" }}>
            <Skeleton variant="text" width="60px" animation="wave" />
          </Typography>
        </Stack>
        <Typography color="gray" fontSize="14px">
          <Skeleton variant="text" width="150px" animation="wave" />
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChatUserSkeleton;
