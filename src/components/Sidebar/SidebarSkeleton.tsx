import React from "react";
import { ProfileBox, WrapperBox, StyledButton } from "./Sidebar";
import { Skeleton, Typography, Box } from "@mui/material";
import { AccountCircle, People } from "@mui/icons-material";

const SidebarSkeleton = () => {
  return (
    <div className="sticky">
      <WrapperBox>
        <ProfileBox>
          <Skeleton
            variant="circular"
            width={72}
            height={72}
            animation="wave"
            sx={{ marginBottom: "15px" }}
          />
          <Typography>
            <Skeleton variant="rectangular" width="110px" height="16px" />
          </Typography>
          <Typography sx={{ marginTop: "10px" }}>Add a photo</Typography>
        </ProfileBox>
        <Box padding="15px">
          <StyledButton>
            {" "}
            <People
              sx={{
                fontSize: "30px",
                marginRight: "10px",
                color: "#047891",
              }}
            />{" "}
            Contacts
          </StyledButton>
          <StyledButton>
            <AccountCircle
              sx={{
                fontSize: "30px",
                marginRight: "10px",
                color: "#047891",
              }}
            />
            Profile
          </StyledButton>
        </Box>
      </WrapperBox>
    </div>
  );
};

export default SidebarSkeleton;
