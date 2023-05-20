import { ModalDialog } from "@mui/joy";
import { Box, Button, Modal } from "@mui/material";
import React from "react";
import Avatar from "react-avatar-edit";
import { addProfilePicture } from "../utils/profileFunctions";

interface Props {
  open: boolean;
  setOpen: (arg: boolean) => void;
}

const UserPhotoModal: React.FC<Props> = ({ open, setOpen }) => {
  const [photo, setPhoto] = React.useState<string | undefined>(undefined);

  function onClose() {
    setPhoto(undefined);
  }
  function onCrop(pv: string) {
    setPhoto(pv);
  }

  const addUserPhoto = async () => {
    if (photo) {
      setOpen(false);
      addProfilePicture(photo);
      setPhoto(undefined);
      // refresh();
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setPhoto(undefined);
      }}
      sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
    >
      <ModalDialog
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
          <Button variant="contained" color="success" onClick={addUserPhoto}>
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
  );
};

export default UserPhotoModal;
