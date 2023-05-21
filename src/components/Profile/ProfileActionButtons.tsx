import { Logout } from "@mui/icons-material";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import React from "react";
import { StyledButton } from "./ProfileInfo";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { theme } from "../../utils/theme";
import { removeUser } from "../../redux/userSlice/slice";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileActionButtons = () => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const matches = useMediaQuery(theme.breakpoints.up(650));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
   auth.signOut();
   localStorage.removeItem("isAuth");
   dispatch(removeUser());
   navigate("/login");
 };

  return (
    <>
      {matches ? (
        <IconButton
          sx={{
            bgcolor: "#047891",
            "&:hover": { backgroundColor: "#00637a" },
          }}
        >
          <Logout
            onClick={() => {
              setOpenDialog(true);
            }}
            sx={{ color: "white" }}
          />
        </IconButton>
      ) : (
        <StyledButton
          sx={{
            color: "#047891",
            width: "100%",
            "&:hover": { backgroundColor: "#dcf5fa" },
          }}
          onClick={() => {
            setOpenDialog(true);
          }}
          startIcon={<Logout sx={{ color: "#047891" }} />}
        >
          Log out{" "}
        </StyledButton>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle id="dialog-title">Log out</DialogTitle>
        <DialogContent sx={{ paddingBottom: "0" }}>
          <DialogContentText id="dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
          <DialogActions>
            <Button onClick={logOut}>Leave</Button>
            <Button autoFocus onClick={() => setOpenDialog(false)}>
              Stay
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileActionButtons;
