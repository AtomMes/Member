import { Box, styled } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import ChatPage from "./pages/ChatPage";
import ContactsPage from "./pages/ContactsPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import { checkLoggedInUser } from "./utils/checkLoggedInUser";

export const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  width: "calc(100% -15px)",
  border: "1px solid rgba(50, 50, 50, .2) ",
  borderRadius: "10px",
  padding: "15px",
}));

const App: React.FC = () => {
  React.useEffect(() => {
    checkLoggedInUser();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box width="100%" maxWidth="1100px" margin="0 auto">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/messaging" element={<ChatPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/profile/:id" element={<UserProfilePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
