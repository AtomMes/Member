import {
  AccountBox,
  AccountCircle,
  Article,
  People,
} from "@mui/icons-material";
import { ModalDialog } from "@mui/joy";
import { Button, Modal, Skeleton, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import React from "react";
import Avatar from "react-avatar-edit";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { getUserData } from "../../hooks/getUserData";
import { useAppSelector } from "../../hooks/redux-hooks";
import { addProfilePicture } from "../../utils/profileFunctions";
import CurrentUserAvatar from "../CurrentUserAvatar";
import UserPhotoModal from "../UserPhotoModal";
import SidebarSkeleton from "./SidebarSkeleton";

export const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  color: "black",
  textTransform: "none",
  fontSize: "17px",
}));

export const WrapperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  border: "1px solid rgba(50, 50, 50, .2) ",
  borderRadius: "10px",
}));

export const ProfileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderBottom: "1px solid rgba(50, 50, 50, .2) ",
  padding: "15px",
}));

const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const { userData } = getUserData(auth.currentUser!.uid);

  if (!userData) return <SidebarSkeleton />;

  return (
    <div className="sticky">
      <WrapperBox>
        <ProfileBox>
          <CurrentUserAvatar
            size="70px"
            mb="15px"
            username={userData.username}
            photoURL={userData.photoURL}
            id={userData.id}
          />
          <Typography>{userData.username}</Typography>
          <Typography onClick={() => setOpen(!open)}>
            {userData.photoURL ? "Change Photo" : "Add a photo"}
          </Typography>
        </ProfileBox>
        <Box padding="15px">
          <StyledButton onClick={() => navigate("/contacts")}>
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
          <StyledButton
            onClick={() => navigate(`/profile/${auth.currentUser!.uid}`)}
          >
            <AccountCircle
              sx={{ fontSize: "30px", marginRight: "10px", color: "#047891" }}
            />
            Profile
          </StyledButton>
        </Box>
        <UserPhotoModal open={open} setOpen={setOpen} />
      </WrapperBox>
    </div>
  );
};

export default Sidebar;
