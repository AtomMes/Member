import { Box, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ChatLeftSide from "./ChatLeftSide";
import ChatRightSide from "./ChatRightSide";

const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "1px solid rgba(50, 50, 50, .2) ",
  borderRadius: "10px",
}));

const Chat: React.FC = () => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [position, setPosition] = React.useState("left");

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
