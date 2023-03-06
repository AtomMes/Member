import { Group, Login, Logout, Message, PersonAdd } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  styled,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import { removeUser } from "../redux/userSlice/slice";
import { theme } from "../utils/theme";
import CurrentUserAvatar from "./CurrentUserAvatar";
import logo from "../images/logoM.png";
import ErrorNavBar from "./ErrorNavBar";

export const StyledTab = styled(Tab)(({ theme }) => ({
  color: "#047891",
  maxWidth: "none",
  minWidth: "none",
  minHeight: "none",
  textTransform: "none",
  padding: "0",
}));

interface Props {
  loggedIn?: boolean;
}

const Navbar: React.FC<Props> = ({ loggedIn }) => {
  const { pathname } = useLocation();

  const location =
    (pathname.includes("/profile") && "0") ||
    (pathname.includes("/messaging") && "3") ||
    (pathname.includes("/contacts") && "2") ||
    (pathname.includes("/") && "1");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showError, setShowError] = React.useState<boolean>(false);
  console.log(showError);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState(location);

  const handleChange = (e: any, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setValue(location);
  }, [location]);

  React.useEffect(() => {
    setShowError(false);
    setTimeout(() => {
      setShowError(true);
    }, 3000);
  }, []);

  const { userData } = getUserData(auth.currentUser?.uid);

  const float = useMediaQuery(theme.breakpoints.down(410));

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
          {!loggedIn && (
            <Stack flexDirection="row" gap="15px">
              {!float ? (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<Login />}
                    sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    sx={{ textTransform: "none" }}
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <IconButton onClick={() => navigate("/login")}>
                    <Login sx={{ color: "#047891" }} />
                  </IconButton>
                  <IconButton onClick={() => navigate("/register")}>
                    <PersonAdd sx={{ color: "#047891" }} />
                  </IconButton>
                </>
              )}
            </Stack>
          )}

          {loggedIn && (
            <>
              <Stack direction="row" spacing={2} alignItems="center">
                {!float && (
                  <Tabs value={value} onChange={handleChange}>
                    <StyledTab
                      value="1"
                      onClick={() => navigate("/")}
                      icon={<HomeIcon sx={{ fontSize: "30px" }} />}
                      label="Home"
                    />
                    <StyledTab
                      value="2"
                      onClick={() => navigate("/contacts")}
                      icon={<Group sx={{ fontSize: "30px" }} />}
                      label="Contacts"
                    />
                    <StyledTab
                      value="3"
                      onClick={() => navigate("/messaging")}
                      icon={<Message sx={{ fontSize: "30px" }} />}
                      label="Chats"
                    />
                  </Tabs>
                )}
                <Box onClick={handleClick}>
                  <CurrentUserAvatar
                    username={userData!.username}
                    photoURL={userData!.photoURL}
                    size="45px"
                    id={userData!.id}
                    disableNav
                  />{" "}
                </Box>
              </Stack>
              <Menu
                anchorEl={anchorEl!}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose(),
                      navigate(`/profile/${auth.currentUser!.uid}`),
                      setValue("4");
                  }}
                >
                  <CurrentUserAvatar
                    username={userData!.username}
                    photoURL={userData!.photoURL}
                    id={userData!.id}
                  />{" "}
                  Profile
                </MenuItem>
                <Divider />
                {float && (
                  <>
                    <MenuItem
                      onClick={() => {
                        auth.signOut();
                        localStorage.removeItem("isAuth");
                        dispatch(removeUser());
                        navigate("/");
                      }}
                    >
                      <ListItemIcon>
                        <HomeIcon sx={{ color: "#047891" }} />
                      </ListItemIcon>
                      Home
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        auth.signOut();
                        localStorage.removeItem("isAuth");
                        dispatch(removeUser());
                        navigate("/contacts");
                      }}
                    >
                      <ListItemIcon>
                        <Group sx={{ color: "#047891" }} />
                      </ListItemIcon>
                      Contacts
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        auth.signOut();
                        localStorage.removeItem("isAuth");
                        dispatch(removeUser());
                        navigate("/messaging");
                      }}
                    >
                      <ListItemIcon>
                        <Message sx={{ color: "#047891" }} />{" "}
                      </ListItemIcon>
                      Chats
                    </MenuItem>
                  </>
                )}
                <MenuItem
                  onClick={() => {
                    auth.signOut();
                    localStorage.removeItem("isAuth");
                    dispatch(removeUser());
                    navigate("/login");
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" sx={{ color: "#047891" }} />
                  </ListItemIcon>
                  Log out
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
