import React from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat/Chat";
import { auth } from "../firebase";

const ChatPage: React.FC = () => {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  if (!isAuth) navigate("/login");

  return <Chat />;
};

export default ChatPage;
