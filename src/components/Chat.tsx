import { Box, Grid, styled } from "@mui/material";
import React from "react";
import ChatRightSide from "./ChatRightSide";
import ChatLeftSide from "./ChatLeftSide";

const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "1px solid rgba(50, 50, 50, .2) ",
  borderRadius: "10px",
}));

const Chat: React.FC = () => {
  return (
    <WrapperBox bgcolor="red" height="800px">
      <Grid container>
        <Grid
          item
          xs={4}
          borderRight="1px solid rgba(50, 50, 50, .2)"
          height="800px"
        >
          <ChatLeftSide />
        </Grid>
        <Grid item xs={8} height="800px">
          <ChatRightSide />
        </Grid>
      </Grid>
    </WrapperBox>
  );
};

export default Chat;
