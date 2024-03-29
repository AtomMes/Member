import { Box, styled } from "@mui/material";
import React from "react";
import ChatLeftSide from "./Left/ChatLeftSide";
import ChatRightSide from "./Right/ChatRightSide";

const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "1px solid rgba(50, 50, 50, .2) ",
  borderRadius: "10px",
  overflow: "hidden",
}));

const Chat: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const handleClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <WrapperBox
      height={window.innerHeight - 85}
      maxHeight="calc(100% - 1000px)"
      display="flex"
    >
      <ChatLeftSide isDrawerOpen={isDrawerOpen} handleClick={handleClick} />
      <ChatRightSide handleClick={handleClick} />
    </WrapperBox>
  );
};

export default Chat;
