import { Box, styled, ThemeProvider } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import { useAppSelector } from "./hooks/redux-hooks";
import { useAuth } from "./hooks/useAuth";
import ChatPage from "./pages/ChatPage";
import ContactsPage from "./pages/ContactsPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import { checkLoggedInUser } from "./utils/checkAuthUser";
import { theme } from "./utils/theme";

export const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  width: "calc(100% -15px)",
  border: "1px solid rgba(50, 50, 50, .2) ",
  borderRadius: "10px",
  padding: "15px",
}));

const App: React.FC = () => {
  const [isUserReady, setIsUserReady] = React.useState(false);
  const { email } = useAppSelector((state) => state.user);

  const { isAuth } = useAuth();

  React.useEffect(() => {
    checkLoggedInUser();
  }, [isAuth]);

  React.useEffect(() => {
    setIsUserReady(!!auth.currentUser);
  }, [email]);

  return (
    <Box>
      {isAuth && isUserReady ? <Navbar loggedIn /> : <Navbar />}
      <Box width="100%" maxWidth="1100px" margin="0 auto">
        {!isAuth && (
          <>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<LoginPage />} />
            </Routes>
          </>
        )}
        {isAuth && isUserReady && (
          <>
            <Routes>
              <Route path="/messaging" element={<ChatPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/" element={<Home />} />
              <Route
                path="*"
                element={
                  <>
                    <Navigate to="/" /> <Home />
                  </>
                }
              />
              <Route path="/profile/:id" element={<UserProfilePage />} />
              <Route path="/contacts" element={<ContactsPage />} />
            </Routes>
          </>
        )}
      </Box>
    </Box>
  );
};

export default App;
