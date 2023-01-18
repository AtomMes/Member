import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Sidebar = () => {
  return (
    <Box>
      <Box bgcolor="red" width="280px" borderRadius='10px' >
        <Box>
          <Avatar>AM</Avatar>
          <Typography>Welcome Atom</Typography>
          <Typography>Add a photo</Typography>
        </Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
