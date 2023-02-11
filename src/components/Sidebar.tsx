import { Article, People } from "@mui/icons-material";
import { Button, Modal, Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import Avatar from "react-avatar-edit";
import CurrentUserAvatar from "./CurrentUserAvatar";
import { ModalDialog } from "@mui/joy";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../hooks/redux-hooks";

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

const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { username, imageURL } = useAppSelector((state) => state.user);

  const auth = getAuth();

  const user = auth.currentUser;

  const [photo, setPhoto] = React.useState<string | undefined>(undefined);

  function onClose() {
    setPhoto(undefined);
  }
  function onCrop(pv: any) {
    setPhoto(pv);
  }

  const refresh = () => {
    window.location.reload();
  };

  const addUserPhoto = async () => {
    if (photo) {
      setOpen(false);
      setPhoto(undefined);
      const storage = getStorage();
      if (user) {
        const fileRef = ref(storage, "userAvatars/" + user.uid + ".png");
        if (photo) {
          await uploadString(fileRef, photo, "data_url");
        }
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(user, {
          photoURL: photoURL,
        });
        const refer = doc(db, "users", auth.currentUser.uid);
        await setDoc(refer, {
          username: auth.currentUser.displayName,
          email: auth.currentUser.email,
          id: auth.currentUser.uid,
          photoURL: auth.currentUser.photoURL,
        });
      }
      refresh();
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <div className="sticky">
      <WrapperBox>
        <ProfileBox>
          <CurrentUserAvatar
            size="70px"
            mb="15px"
            username={username}
            photoURL={imageURL && imageURL}
          />
          <Typography>{username}</Typography>

          <Typography onClick={() => setOpen(!open)}>
            {imageURL ? "Change Photo" : "Add a photo"}
          </Typography>
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
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
            setPhoto(undefined);
          }}
          sx={{ width: "500px", margin: "0 auto" }}
        >
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{
              borderRadius: "md",
              boxShadow: "lg",
              minWidth: "100%",
              backgroundColor: "rgba(255,255,255, .9)",
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              overflow="auto"
            >
              <Avatar
                width={300}
                height={300}
                onCrop={onCrop}
                onClose={onClose}
                src={undefined}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              {photo && <img src={photo} alt="Preview" />}
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              margin="20px 0 0"
              gap="80px"
            >
              <Button
                variant="contained"
                color="success"
                onClick={addUserPhoto}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setPhoto(undefined);
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
      </WrapperBox>
    </div>
  );
};

export default Sidebar;
