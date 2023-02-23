import React from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { WrapperBox } from "../App";
import { MoreHoriz, ThreeDRotationSharp } from "@mui/icons-material";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import CurrentUserAvatar from "./CurrentUserAvatar";
import { getUserData } from "../hooks/getUserData";
import {
  connectBack,
  removeConnection,
  removeRequest,
  sendRequest,
} from "../utils/connectionFunctions";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { getMutualConnections } from "../hooks/useMutualConnections";
import { setChat } from "../redux/chatSlice/slice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../hooks/redux-hooks";
import { useConnectionType } from "../hooks/useConnectionType";

interface Props {
  contact: string;
}

const ProfileContact: React.FC<Props> = ({ contact }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { userData, loading } = getUserData(contact);
  const { mutualContacts } = getMutualConnections(contact);

  const navigate = useNavigate();

  const onView = () => {
    handleClose();
    navigate(`/profile/${userData!.id}`);
  };

  const dispatch = useAppDispatch();

  const { myContacts, inMyRequests, inContacts, inRequests } =
    useConnectionType(contact);

  if (!userData)
    return (
      <>
        {/*@ts-ignore */}
        <Grid item xs={12} ut={6} sx={{ xs: 12 }} display="flex">
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
            <Box marginRight="10px">
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                animation="wave"
              />
            </Box>
            <Stack justifyContent="center" flex="1">
              <Typography variant="body1" width="100%">
                <Skeleton variant="text" width="100px" animation="wave" />
              </Typography>
              <Typography
                sx={{
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                <Skeleton variant="text" width="200px" animation="wave" />
              </Typography>
            </Stack>
            <Skeleton
              variant="rectangular"
              width="40px"
              height="25px"
              sx={{ borderRadius: "20px" }}
              animation="wave"
            />
          </Paper>
        </Grid>
      </>
    );

  console.log(myContacts.includes(userData.id), userData.username, myContacts);

  return (
    <>
      {/*@ts-ignore */}
      <Grid item xs={12} ut={6} sx={{ xs: 12 }} display="flex">
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
                {userData.id !== auth.currentUser!.uid
                  ? `${mutualContacts.length} mutual connections`
                  : "(You)"}
              </Typography>
            </Stack>
            {myContacts.includes(userData.id) ? (
              <>
                {console.log(userData.id !== auth.currentUser!.uid)}
                <Button
                  onClick={handleClick}
                  sx={{
                    color: "black",
                    textTransform: "none",
                    minWidth: "0",
                    minHeight: "0",
                    padding: "0",
                    height: "fit-content",
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
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      dispatch(
                        setChat({
                          displayName: userData!.username,
                          photoURL: userData!.photoURL,
                          uid: userData!.id,
                        })
                      );
                      navigate("/messaging");
                    }}
                  >
                    Send Message
                  </MenuItem>
                  <MenuItem onClick={onView}>View Profile</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {userData.id === auth.currentUser!.uid ? (
                  ""
                ) : (
                  <>
                    {inRequests && (
                      <Button
                        sx={{ color: "black", textTransform: "none" }}
                        onClick={() => {
                          removeRequest(userData.id);
                        }}
                      >
                        Pending
                      </Button>
                    )}
                    {!inContacts && !inRequests && !inMyRequests && (
                      <Button
                        sx={{ color: "black", textTransform: "none" }}
                        onClick={() => {
                          sendRequest(userData.id);
                        }}
                      >
                        Connect
                      </Button>
                    )}
                    {inContacts && (
                      <Button
                        sx={{ color: "black", textTransform: "none" }}
                        onClick={() => {
                          removeConnection(userData.id);
                        }}
                      >
                        Connected
                      </Button>
                    )}
                    {inMyRequests && !inContacts && (
                      <Button
                        sx={{ color: "black", textTransform: "none" }}
                        onClick={() => {
                          connectBack(userData.id);
                        }}
                      >
                        Connect back
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </Paper>
        )}
      </Grid>
    </>
  );
};

export default ProfileContact;
