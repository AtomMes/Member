import { Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const UserSearch = () => {
  const [users, setUsers] = React.useState([]);

  const [value, setValue] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = async (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    const usersRef = collection(db, "users");
    const data = await getDocs(usersRef);
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUsers(
      newData.filter(
        (user) =>
          user.username.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <form onSubmit={handleClick}>
        <TextField
          size="small"
          color="secondary"
          sx={{ width: "300px" }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Menu
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": "resources-button",
        }}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            width: 300,
          },
        }}
      >
        {users.map((user, i) => (
          <MenuItem onClick={handleClose} key={i}>
            <Avatar>
              {user.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <Typography marginLeft="10px">{user.username}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default UserSearch;
