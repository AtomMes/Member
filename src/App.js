import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { user } = useSelector((state) => state);

  return (
    <Box>
      <Navbar />
      <Box width='100%' maxWidth='1100px' margin='0 auto' >
        <Routes>
          <Route path="/" element={!user.email ? <Home /> : <Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
