import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  username: string | null;
  size?: string | undefined;
  mb?: string | undefined;
  photoURL: string | null;
  id: string;
  disableNav?: boolean;
}

const CurrentUserAvatar: React.FC<Props> = ({
  username,
  size,
  mb,
  photoURL,
  id,
  disableNav,
}) => {
  const navigate = useNavigate();

  return (
    <Avatar
      src={photoURL!}
      sx={{ width: size, height: size, marginBottom: mb }}
      onClick={() => {
        !disableNav && navigate(`/profile/${id!}`);
      }}
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
