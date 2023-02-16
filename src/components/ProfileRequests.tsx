import {
  Check,
  Delete,
  MoreHoriz,
  ThreeDRotationSharp,
} from "@mui/icons-material";
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
import { WrapperBox } from "../App";
import { auth } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import ProfileRequest from "./ProfileRequest";

const ProfileRequests: React.FC = () => {
  const { userData, loading } = getUserData(auth.currentUser?.uid);

  if (!userData) return <>Loading...</>;
  return (
    <Grid container spacing="20px" sx={{ padding: 0 }}>
      {userData.requests.map((request: string, i: string) => (
        <ProfileRequest request={request} key={i} />
      ))}
    </Grid>
  );
};

export default ProfileRequests;
