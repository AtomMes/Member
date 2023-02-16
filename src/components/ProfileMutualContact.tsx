import { Avatar } from "@mui/material";
import React from "react";
import { getUserData } from "../hooks/getUserData";
import CurrentUserAvatar from "./CurrentUserAvatar";

interface Props {
  contact: string;
}

const ProfileMutualContact: React.FC<Props> = ({ contact }) => {
  const { userData, loading } = getUserData(contact);

  if (!userData) {
    return <>Loading</>;
  }

  return (
    <CurrentUserAvatar
      username={userData.username}
      photoURL={userData.photoURL}
      id={contact}
    />
  );
};

export default ProfileMutualContact;
