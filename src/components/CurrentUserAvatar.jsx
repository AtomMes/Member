import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const CurrentUserAvatar = ({ username, size, mb, photoURL, user }) => {
  return (
    <Avatar
      src={photoURL && photoURL}
      sx={{ width: size, height: size, marginBottom: mb }}
    >
      {!photoURL &&
        username &&
        username
          .split(" ")
          .slice(0, 2)
          .map((word) => word[0])
          .join("")
          .toUpperCase()}
    </Avatar>
  );
};

export default CurrentUserAvatar;
