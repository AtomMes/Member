import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box, styled } from "@mui/material";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import { useAppSelector } from "./hooks/redux-hooks";
import { useAuth } from "./hooks/useAuth";
import { checkLoggedInUser } from "./utils/checkAuthUser";

const ChatPage = lazy(() => import("./pages/ChatPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));

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
      {isAuth ? <Navbar loggedIn={true} /> : <Navbar loggedIn={false} />}
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
