import {
  Grid
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import ProfileContact from "./ProfileContact";

const ProfileContacts: React.FC = () => {
  const { id } = useParams();

  const { userData, loading } = getUserData(id || auth.currentUser!.uid);

  if (!userData) return <>Loading...</>;

  return (
    <Grid container spacing="20px" sx={{ padding: 0 }}>
      {userData!.contacts.map((contact: string) => (
        <ProfileContact key={contact} contact={contact} />
      ))}
    </Grid>
  );
};

export default ProfileContacts;
