import { Article, People } from "@mui/icons-material";
import { Avatar, Button, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  color: "black",
}));

const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "1px solid rgba(50, 50, 50, .2) ",
  borderRadius: "10px",
}));

const ProfileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderBottom: "1px solid rgba(50, 50, 50, .2) ",
  padding: "15px",
}));

const Sidebar = () => {
  const { username, imageURL } = useSelector((state) => state.user);

  return (
    <WrapperBox>
      <ProfileBox>
        <Avatar sx={{ width: "70px", height: "70px", marginBottom: "20px" }}>
          {username
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase()}
        </Avatar>
        <Typography>{username}</Typography>
        {!imageURL && <Typography>Add a photo</Typography>}
      </ProfileBox>
      <Box padding="15px">
        <StyledButton>
          {" "}
          <People
            sx={{
              fontSize: "30px",
              marginRight: "10px",
            }}
          />{" "}
          Contacts
        </StyledButton>
        <StyledButton>
          {" "}
          <Article sx={{ fontSize: "30px", marginRight: "10px" }} /> Posts
        </StyledButton>
      </Box>
    </WrapperBox>
  );
};

export default Sidebar;
