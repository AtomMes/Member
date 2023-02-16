import { MoreHoriz, ThreeDRotationSharp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { WrapperBox } from "../App";
import { auth } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import ProfileContact from "./ProfileContact";

const ProfileContacts: React.FC = () => {
  const { id } = useParams();
  const { userData, loading } = getUserData(id);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!userData) return <>Loading...</>;
  return (
    <Grid container spacing="20px" sx={{ padding: 0 }}>
      {userData!.contacts.map((contact: string) => (
        <ProfileContact
          handleClick={handleClick}
          handleClose={handleClose}
          anchorEl={anchorEl}
          open={open}
          key={contact}
          contact={contact}
        />
      ))}
    </Grid>
  );
};

export default ProfileContacts;
