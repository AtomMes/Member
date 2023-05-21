import {
  AvatarGroup,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  styled,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import CurrentUserAvatar from "../CurrentUserAvatar";
import { AddAPhoto, Lock, Logout } from "@mui/icons-material";
import UserPhotoModal from "../UserPhotoModal";
import ProfileMutualContact from "./ProfileMutualContact";
import { auth } from "../../firebase";

import {
  connectBack,
  removeConnection,
  removeRequest,
  sendRequest,
} from "../../utils/connectionFunctions";
import { theme } from "../../utils/theme";
import { DocumentData } from "firebase/firestore";
import { useConnectionType } from "../../hooks/useConnectionType";
import { getMutualConnections } from "../../hooks/useMutualConnections";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../redux/userSlice/slice";
import { setChat } from "../../redux/chatSlice/slice";

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "10px",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  border: "1px solid #047891",
  fontWeight: "400",
  borderRadius: "5px",
  whiteSpace: "nowrap",
  padding: "5px 10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#e6e6e6",
  },
}));

interface Props {
  id: string;
  userData: DocumentData;
}

const ProfileInfo: React.FC<Props> = ({ id, userData }) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openTooltip, setOpenTooltip] = React.useState<boolean>(false);
  const matches = useMediaQuery(theme.breakpoints.up(650));
  const float = useMediaQuery(theme.breakpoints.up(410));
  const { myContacts, inMyRequests, inContacts, inRequests } =
    useConnectionType(id);
  const { mutualContacts } = getMutualConnections(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  };

  const logOut = () => {
    auth.signOut();
    localStorage.removeItem("isAuth");
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <Stack
      sx={{
        flexDirection: matches ? "row" : "column",
        alignItems: !float ? "center" : "initial",
        paddingLeft: !matches ? 0 : "30px",
      }}
      width="100%"
      borderBottom="1px solid #047891"
      paddingBottom="20px"
    >
      <Stack
        sx={{
          flexDirection: float ? "row" : "column",
          alignItems: !float ? "center" : "initial",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CurrentUserAvatar
            username={userData.username}
            photoURL={userData.photoURL}
            id={userData.id}
            size={"170px"}
          />
          {id === auth.currentUser!.uid && (
            <>
              <IconButton
                sx={{
                  minWidth: "0",
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  color: "dimgray",
                  zIndex: "100",
                  bgcolor: "white",
                  border: "1px solid gray",
                  transition: ".2s",
                  "&:hover": {
                    backgroundColor: "#00637a",
                    transform: "scale(1.1)",
                  },
                  backgroundColor: "#047891",
                }}
                size="small"
                onClick={() => setOpenModal(true)}
              >
                <AddAPhoto fontSize="small" sx={{ color: "white" }} />
              </IconButton>
              <UserPhotoModal open={openModal} setOpen={setOpenModal} />
            </>
          )}
        </Box>
        <Box
          display="flex"
          marginLeft="20px"
          flexDirection="column"
          justifyContent="end"
          alignItems="start"
        >
          <Typography variant="h3" textAlign="center">
            {userData.username}
          </Typography>
          {id === auth.currentUser!.uid ? (
            <>
              <Typography>{myContacts.length} Contacts</Typography>
              <AvatarGroup>
                {myContacts.map((contact) => (
                  <ProfileMutualContact contact={contact} />
                ))}
              </AvatarGroup>
            </>
          ) : (
            <>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                {mutualContacts.length} Mutual Contacts
              </Typography>
              <AvatarGroup>
                {mutualContacts.map((contact: string) => (
                  <ProfileMutualContact contact={contact} />
                ))}
              </AvatarGroup>
            </>
          )}
        </Box>
      </Stack>
      <Stack
        flexDirection="row"
        alignItems="end"
        justifyContent="end"
        width="100%"
        gap="10px"
      >
        {id === auth.currentUser!.uid ? (
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
        ) : (
          <>
            {inRequests && (
              <StyledButton
                sx={{
                  width: !matches ? "100%" : "initial",
                  "&:hover": { backgroundColor: "#dcf5fa" },
                }}
                variant="outlined"
                onClick={() => {
                  removeRequest(id!);
                }}
              >
                Pending
              </StyledButton>
            )}
            {!inContacts && !inRequests && !inMyRequests && (
              <StyledButton
                sx={{
                  width: !matches ? "100%" : "initial",
                  "&:hover": { backgroundColor: "#dcf5fa" },
                }}
                variant="outlined"
                onClick={() => {
                  sendRequest(id!);
                }}
              >
                Connect
              </StyledButton>
            )}
            {inContacts && (
              <StyledButton
                sx={{
                  width: !matches ? "100%" : "initial",
                  "&:hover": { backgroundColor: "#dcf5fa" },
                }}
                variant="outlined"
                onClick={() => {
                  removeConnection(id!);
                }}
              >
                Connected
              </StyledButton>
            )}
            {inMyRequests && !inContacts && (
              <StyledButton
                sx={{
                  width: !matches ? "100%" : "initial",
                  "&:hover": { backgroundColor: "#dcf5fa" },
                }}
                variant="outlined"
                onClick={() => {
                  connectBack(id!);
                }}
              >
                Connect back
              </StyledButton>
            )}
            <Tooltip
              title="You must be connected"
              open={openTooltip}
              onOpen={handleOpenTooltip}
              onClick={handleOpenTooltip}
              TransitionComponent={Zoom}
              arrow
              placement="top"
              disableHoverListener={inContacts}
            >
              <Box
                sx={{
                  width: !matches ? "calc(100% + 20px)" : "initial",
                }}
              >
                <StyledButton
                  disabled={!inContacts}
                  sx={{
                    width: !matches ? "100%" : "initial",
                    border: !inContacts
                      ? "1px solid gray"
                      : "1px solid #047891",
                    "&:hover": { backgroundColor: "#dcf5fa" },
                  }}
                  onClick={() => {
                    dispatch(
                      setChat({
                        displayName: userData.username,
                        photoURL: userData.photoURL,
                        uid: userData.id,
                      })
                    );
                    navigate("/messaging");
                  }}
                  startIcon={!inContacts && <Lock />}
                >
                  Message
                </StyledButton>
              </Box>
            </Tooltip>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default ProfileInfo;
