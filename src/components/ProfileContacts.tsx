import { Alert, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import ProfileContact from "./ProfileContact";

const ProfileContacts: React.FC = () => {
  const { id } = useParams();

  const { userData, loading } = getUserData(id || auth.currentUser!.uid);

  if (!userData) return <></>;

  return (
    <Grid container spacing="20px" sx={{ padding: 0 }}>
      {userData.contacts.length ? (
        userData!.contacts.map((contact: string) => (
          <ProfileContact key={contact} contact={contact} />
        ))
      ) : (
        <Alert severity="info" variant="outlined" sx={{ margin: "20px auto" }}>
          You don't have any contacts yet. Use the search bar above to find and
          add contacts.
        </Alert>
      )}
    </Grid>
  );
};

export default ProfileContacts;
