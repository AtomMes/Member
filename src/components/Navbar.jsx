import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  styled,
  Avatar,
  Badge,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Tab } from "@mui/material";
import {
  TabContext, //mejnen gtnvum naviacion tabery u erevacox cherevacox tabery
  TabList, //navigaciayi tabery mejnen
} from "@mui/lab";
import FavoriteIcon from "@mui/icons-material/Favorite";

import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import HomeIcon from "@mui/icons-material/Home";
import { Stack } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  AccountCircle,
  AccountCircleRounded,
  Group,
  Message,
  Search,
  VerifiedUser,
} from "@mui/icons-material";
import UserSearch from "./UserSearch";

const StyledTab = styled(Tab)(({ theme }) => ({
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

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "white", color: "darkGray", marginBottom: "10px" }}
    >
      <Box maxWidth="1100px" width="100%" margin="0 auto">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <CatchingPokemonIcon />
            </IconButton>
            <UserSearch />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <TabContext value={value}>
              <TabList
                aria-label="Tabs example"
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary" //taki toxi colorna
                centered
              >
                <StyledTab
                  icon={<HomeIcon sx={{ fontSize: "30px" }} />}
                  label="Home"
                />
                <StyledTab
                  icon={<Group sx={{ fontSize: "30px" }} />}
                  label="Contacts"
                />
                <StyledTab
                  icon={<Message sx={{ fontSize: "30px" }} />}
                  label="Notifications"
                />
              </TabList>
            </TabContext>
            <StyledBadge
              id="resources-button" //id enq tali karavarelu hamar
              onClick={handleClick}
              aria-controls={open ? "resources-menu" : undefined} //aria controlsov karavarum enq resources-menu i exeliutyuny
              aria-haspopup="true" //popup uni te che? asum enq ha
              aria-expanded={open ? "true" : undefined} //asumenq razvernuta te che, openi heta kaxvac de parza
              endIcon={<KeyboardArrowDownIcon />} //prosty icon
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <AccountCircleRounded sx={{ fontSize: "40px" }} />{" "}
            </StyledBadge>
          </Stack>
          <Menu
            id="resources-menu" //id vor karavaren sranov
            anchorEl={anchorEl} //popupi poziciayi het kap uni,
            open={open} //open aysinqn erevuma te che
            MenuListProps={{
              "aria-labelledby": "resources-button", //asuma te vor elementy karan ira ogtagorci senc asac, dabro enq tali resource-buttonin meznov karavarel
            }}
            onClose={handleClose} //erb vor pakvi inch funkcia kanchi, componentWillUnmounti nman eli yani
            anchorOrigin={{
              //poziciana dzum
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              //poziciana dzum
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Posts</MenuItem>
            <MenuItem onClick={handleClose}>Theme</MenuItem>
          </Menu>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
