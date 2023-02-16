import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { WrapperBox } from "../App";
import { MoreHoriz, ThreeDRotationSharp } from "@mui/icons-material";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import CurrentUserAvatar from "./CurrentUserAvatar";
import { getUserData } from "../hooks/getUserData";
import { removeConnection } from "../utils/connectionFunctions";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { getMutualConnections } from "../hooks/useMutualConnections";

interface Props {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  anchorEl: null | HTMLElement;
  open: boolean;
  contact: string;
}

const ProfileContact: React.FC<Props> = ({
  handleClick,
  handleClose,
  anchorEl,
  open,
  contact,
}) => {
  const { userData, loading } = getUserData(contact);
  const { mutualContacts } = getMutualConnections(contact);
  const [myContacts, setMyContacts] = React.useState<string[]>([]);

  if (!auth.currentUser) {
    return <>Loading...</>;
  }

  React.useEffect(() => {
    if (auth.currentUser) {
      (async () => {
        const currentUserRef = doc(db, "users", auth.currentUser!.uid);
        const currentUserDocSnap = await getDoc(currentUserRef);
        setMyContacts(currentUserDocSnap.data()!.contacts);
      })();
    }
  }, [auth.currentUser!.uid]);

  const navigate = useNavigate();
  if (loading) return <>Loading...</>;
  if (!userData) return <>Loading...</>;

  return (
    <Grid item xs={6} display="flex">
      {userData && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            bgcolor: "white",
            padding: "15px",
          }}
        >
          {" "}
          <Box marginRight="10px">
            <CurrentUserAvatar
              username={userData!.username}
              photoURL={userData!.photoURL}
              id={userData!.id}
              size="50px"
            />
          </Box>
          <Stack justifyContent="center" flex="1">
            <Typography>{userData!.username}</Typography>
            <Typography
              sx={{
                color: "gray",
                fontSize: "14px",
                width: "fit-content",
                height: "fit-content",
              }}
            >
              {mutualContacts.length} mutual connections
            </Typography>
          </Stack>
          <Button
            onClick={handleClick}
            sx={{
              minWidth: "0",
              minHeight: "0",
              padding: "0",
              height: "fit-content",
              color: "black",
            }}
          >
            <MoreHoriz />
          </Button>
          <Menu
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            anchorEl={anchorEl}
            open={open}
            PaperProps={{
              elevation: 1,
            }}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                removeConnection(userData.id);
              }}
            >
              Remove Connection
            </MenuItem>
            <MenuItem onClick={handleClose}>Send Message</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(`/profile/${userData.id}`);
              }}
            >
              View Profile
            </MenuItem>
          </Menu>
        </Paper>
      )}
    </Grid>
  );
};

export default ProfileContact;
