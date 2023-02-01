import { Avatar, styled } from "@mui/material";
import React from "react";

interface Props {
  username: string | null;
  size?: string | undefined;
  mb?: string | undefined;
  photoURL: string | null;
}

const CurrentUserAvatar: React.FC<Props> = ({
  username,
  size,
  mb,
  photoURL,
}) => {
  return (
    <Avatar
      src={photoURL!}
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
