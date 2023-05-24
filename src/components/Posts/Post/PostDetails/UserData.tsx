import {
  styled,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Snackbar,
  Alert,
  Zoom,
} from "@mui/material";
import React from "react";
import CurrentUserAvatar from "../../../Shared/CurrentUserAvatar";
import { Delete } from "@mui/icons-material";
import { deletePost } from "../../../../utils/postFunctions";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";

const UserDataBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  marginBottom: "10px",
}));

const SnackbarAlert = React.forwardRef(function SnackbarAlert(
  props: any,
  ref: any
) {
  //stexeq chjogi incher arav bayc ena arel vor castomni snackvara stexcel(ira stylerov eli)
  return <Alert elevation={6} ref={ref} {...props} />;
});

interface Props {
  authorId: string;
  userData: DocumentData;
  createdDate: string;
  id: string;
  del?: Boolean;
}

const UserData: React.FC<Props> = ({
  authorId,
  userData,
  createdDate,
  id,
  del,
}) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <UserDataBox>
      <Box onClick={() => navigate(`/profile/${authorId}`)}>
        <CurrentUserAvatar
          username={userData.username}
          photoURL={userData.photoURL}
          id={userData.id}
        />
      </Box>
      <Typography flex="1">{userData!.username}</Typography>
      <Typography
        fontSize="14px"
        color="dimgray"
        bgcolor="#e8fdff"
        borderRadius="10px"
        padding="5px 10px"
      >
        {createdDate.replace("about", "")}
      </Typography>
      {del && (
        <>
          <Tooltip
            title="Delete"
            TransitionComponent={Zoom}
            arrow
            placement="left"
          >
            <IconButton>
              <Delete
                onClick={() => setOpenDialog(true)}
                sx={{ color: "#047891" }}
              />
            </IconButton>
          </Tooltip>
          <Dialog
            aria-labelledby="dialog-title" //
            aria-describedby="dialog-description" //es 2y yanm ban chen poxm bayc tox mnan //?
            open={openDialog}
            onClose={() => setOpenDialog(false)} //vor urish tex sxmen onClose a kanchvelu
          >
            <DialogTitle id="dialog-title">Delete the post?</DialogTitle>
            <DialogContent>
              <DialogContentText id="dialog-description">
                Please note that once you delete this post, any comments or
                interactions associated with it will also be removed.
              </DialogContentText>
              <DialogActions>
                <Button
                  autoFocus //vor miangamic sra vra fokusy exni,
                  onClick={() => deletePost(id)}
                >
                  Submit
                </Button>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <SnackbarAlert
              onClose={() => setOpenSnackbar(false)}
              severity="success"
            >
              Post deleted successfully!
            </SnackbarAlert>
          </Snackbar>
        </>
      )}
    </UserDataBox>
  );
};

export default UserData;
