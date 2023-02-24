import { Article, People } from "@mui/icons-material";
import { ModalDialog } from "@mui/joy";
import { Button, Modal, styled, Typography } from "@mui/material";
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
import { db } from "../firebase";
import { useAppSelector } from "../hooks/redux-hooks";
import CurrentUserAvatar from "./CurrentUserAvatar";

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

  const { username, id } = useAppSelector((state) => state.user);

  const auth = getAuth();

  const user = auth.currentUser;

  const [photo, setPhoto] = React.useState<string | undefined>(undefined);

  function onClose() {
    setPhoto(undefined);
  }
  function onCrop(pv: any) {
    setPhoto(pv);
  }

  const addUserPhoto = async () => {
    if (photo) {
      setOpen(false);
      const storage = getStorage();
      if (user) {
        const fileRef = ref(storage, "userAvatars/" + user.uid + ".png");
        try {
          await uploadString(fileRef, photo, "data_url");
          const photoURL = await getDownloadURL(fileRef);
          await updateProfile(user, {
            photoURL: photoURL,
          });
          const refer = doc(db, "users", auth.currentUser.uid);
          await updateDoc(refer, {
            photoURL: auth.currentUser.photoURL,
          });
        } catch (error) {
          console.log(error);
        }
      }
      setPhoto(undefined);
      // refresh();
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
            photoURL={auth.currentUser!.photoURL && auth.currentUser!.photoURL}
            id={id!}
          />
          <Typography>{username}</Typography>
          <Typography onClick={() => setOpen(!open)}>
            {auth.currentUser!.photoURL ? "Change Photo" : "Add a photo"}
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
          sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
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
                width={250}
                height={250}
                onCrop={onCrop}
                onClose={onClose}
                src={undefined}
              />
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
