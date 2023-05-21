import { Alert, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../../../firebase";
import { getUserData } from "../../../../hooks/getUserData";
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
        <Box sx={{ margin: "40px auto" }}>
          <Alert severity="info" variant="outlined" sx={{ marginLeft: "20px" }}>
            {userData.id === auth.currentUser!.uid
              ? "You don't"
              : `${userData.username} doesn't`}{" "}
            have any contacts yet. Use the search bar above to find and add
            contacts.
          </Alert>
        </Box>
      )}
    </Grid>
  );
};

export default ProfileContacts;
