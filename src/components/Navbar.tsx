import { Group, Login, Logout, Message, PersonAdd } from "@mui/icons-material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import HomeIcon from "@mui/icons-material/Home";
import {
  AppBar,
  Avatar,
  Badge,
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
  Typography,
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
import logo from "../images/logoHope.png";

export const StyledTab = styled(Tab)(({ theme }) => ({
  color: "#047891",
  maxWidth: "none",
  minWidth: "none",
  minHeight: "none",
  textTransform: "none",
  padding: "0",
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
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

  const { userData } = getUserData(auth.currentUser?.uid);

  const float = useMediaQuery(theme.breakpoints.down(410));

  if (loggedIn && !userData)
    return (
      <AppBar
        sx={{
          height: "100vh",
          bgcolor: "white",
          color: "darkGray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Stack gap={"20px"}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Oops!
          </Typography>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", width: "100%", maxWidth: "700px" }}
          >
            Something went wrong. We're sorry for the inconvenience. Please
            click the button below to see if it resolves the issue.
          </Typography>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              color: "white",
              bgcolor: "#047891",
              width: "100%",
              maxWidth: "300px",
              margin: "30px auto",
              "&:hover": {
                bgcolor: "#016d85",
              },
            }}
            onClick={() => {
              localStorage.removeItem("isAuth");
              window.location.reload();
            }}
          >
            Try Again
          </Button>
        </Stack>
      </AppBar>
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
            <Avatar src={logo} onClick={() => navigate("/")} />
          </Stack>
          {!loggedIn && (
            <Stack flexDirection="row" gap="15px">
              <Button
                variant="outlined"
                startIcon={<Login />}
                sx={{ textTransform: "none" }}
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
                <StyledBadge
                  id="resources-button" //id enq tali karavarelu hamar
                  onClick={handleClick}
                  aria-controls={open ? "resources-menu" : undefined} //aria controlsov karavarum enq resources-menu i exeliutyuny
                  aria-haspopup="true" //popup uni te che? asum enq ha
                  aria-expanded={open ? "true" : undefined} //asumenq razvernuta te che, openi heta kaxvac de parza
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <CurrentUserAvatar
                    username={userData!.username}
                    photoURL={userData!.photoURL}
                    size="45px"
                    id={userData!.id}
                    disableNav
                  />{" "}
                </StyledBadge>
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
                        <HomeIcon />
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
                        <Group />
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
                        <Message />{" "}
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
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
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
