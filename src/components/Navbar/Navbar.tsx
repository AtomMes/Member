import { AppBar, Box, Stack, Toolbar, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { getUserData } from "../../hooks/getUserData";
import { theme } from "../../utils/theme";
import logo from "../images/logoM.png";
import ErrorNavBar from "./ErrorNavBar";
import UnSigned from "./Unsigned";
import Signed from "./Signed";

interface Props {
  loggedIn?: boolean;
}

const Navbar: React.FC<Props> = ({ loggedIn }) => {
  const [showError, setShowError] = React.useState<boolean>(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setShowError(false);
    setTimeout(() => {
      setShowError(true);
    }, 3000);
  }, []);

  const { userData } = getUserData(auth.currentUser?.uid);

  if (loggedIn && !userData)
    return (
      <>
        <ErrorNavBar />
        {!showError && (
          <AppBar
            position="static"
            sx={{
              bgcolor: "white",
              color: "darkGray",
              marginBottom: "10px",
              height: "72px",
            }}
          >
            <Box maxWidth="1100px" width="100%" margin="0 auto">
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  height: "72px",
                }}
              >
                <img src={logo} width="30px" onClick={() => navigate("/")} />
              </Toolbar>
            </Box>
          </AppBar>
        )}
      </>
    );

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        color: "darkGray",
        marginBottom: "10px",
      }}
    >
      <Box maxWidth="1100px" width="100%" margin="0 auto">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            height: "72px",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            <img src={logo} width="30px" onClick={() => navigate("/")} />
          </Stack>
          {loggedIn ? <Signed userData={userData!} /> : <UnSigned />}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
