import { Alert, Grid } from "@mui/material";
import React from "react";
import { auth } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import ProfileRequest from "./ProfileRequest";

const ProfileRequests: React.FC = () => {
  const { userData, loading } = getUserData(auth.currentUser?.uid);

  if (!userData) return <></>;
  return (
    <Grid container spacing="20px" sx={{ padding: 0 }}>
      {userData.requests.length ? (
        userData.requests.map((request: string, i: string) => (
          <ProfileRequest request={request} key={i} />
        ))
      ) : (
        <Alert severity="info" variant="outlined" sx={{ margin: "20px auto" }}>
          You don't have any requests at the moment. Check back later or invite
          other users to connect with you.
        </Alert>
      )}
    </Grid>
  );
};

export default ProfileRequests;
