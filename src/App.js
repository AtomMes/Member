import { Box, styled } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { checkLoggedInUser } from "./utils/checkLoggedInUser";

export const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  width: "calc(100% -15px)",
  border: "1px solid rgba(50, 50, 50, .2) ",
  borderRadius: "10px",
  padding: "15px",
}));

function App() {
  React.useEffect(() => {
    checkLoggedInUser();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box width="100%" maxWidth="1100px" margin="0 auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/messaging" element={<ChatPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
