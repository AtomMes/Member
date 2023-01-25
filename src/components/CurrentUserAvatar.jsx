import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const CurrentUserAvatar = ({ size, mb }) => {
  const { username } = useSelector((state) => state.user);

  return (
    <Avatar sx={{ width: size, height: size, marginBottom: mb }}>
      {username
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()}
    </Avatar>
  );
};

export default CurrentUserAvatar;
