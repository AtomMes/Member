import { uuidv4 } from "@firebase/util";
import {
  Add,
  AddAPhoto,
  AddCircle,
  Camera,
  Edit,
  Logout,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { updateProfile } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { WrapperBox } from "../App";
import CreatePost from "../components/CreatePost";
import CurrentUserAvatar from "../components/CurrentUserAvatar";
import { StyledTab } from "../components/Navbar";
import ProfileContacts from "../components/ProfileContacts";
import ProfileLikedPosts from "../components/ProfileLikedPosts";
import ProfileMutualContact from "../components/ProfileMutualContact";
import ProfilePosts from "../components/ProfilePosts";
import ProfileRequests from "../components/ProfileRequests";
import { auth, db } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import { useAuth } from "../hooks/useAuth";
import { useConnectionType } from "../hooks/useConnectionType";
import { getMutualConnections } from "../hooks/useMutualConnections";
import { removeUser } from "../redux/userSlice/slice";
import {
  connectBack,
  removeConnection,
  removeRequest,
  sendRequest,
} from "../utils/connectionFunctions";
import { theme } from "../utils/theme";

export const CreatePostButton = styled(Button)(({ theme }) => ({
  marginTop: "10px",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  fontWeight: "400",
  borderRadius: "5px",
  border: "1px solid gray",
  whiteSpace: "nowrap",
  padding: "5px 10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#e6e6e6",
  },
}));

const UserProfilePage: React.FC = () => {
  const [value, setValue] = React.useState("1");
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { id } = useParams();

  const { isAuth } = useAuth();

  const navigate = useNavigate();

  if (!isAuth) navigate("/login");

  if (!auth.currentUser) navigate("/login");

  const { myContacts, inMyRequests, inContacts, inRequests } =
    useConnectionType(id);

  const { mutualContacts } = getMutualConnections(id);

  const [windowWidth, setWindowWidth] = React.useState<number | null>();

  React.useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mutualContacts) return <>Loading...</>;

  const matches = useMediaQuery(theme.breakpoints.up(650));
  const disButtons = useMediaQuery(theme.breakpoints.up(490));
  const float = useMediaQuery(theme.breakpoints.up(410));

  function getFileType(image: File) {
    if (image!.type === "image/jpeg") {
      return "jpg";
    } else if (image!.type === "image/png") {
      return "png";
    } else {
      return "other";
    }
  }

  const coverPhotoUpload = async (image: File) => {
    if (image) {
      setProgress(10);
      setLoading(true);
      console.log(image, "ste hasav");
      const storage = getStorage();
      const fileRef = ref(
        storage,
        "postImages/" + uuidv4() + getFileType(image)
      );
      setProgress(20);

      await uploadBytes(fileRef, image).then(async () => {
        setProgress(40);
        await getDownloadURL(fileRef).then(async (coverPhoto) => {
          setProgress(80);
          const refer = doc(db, "users", auth.currentUser!.uid);
          await updateDoc(refer, {
            coverPhoto: coverPhoto,
          });
          setProgress(100);
        });
      });
      setLoading(false);
    } else {
      alert("Please fill all the fields.");
    }
  };

  const logOut = () => {
    auth.signOut();
    localStorage.removeItem("isAuth");
    dispatch(removeUser());
    navigate("/login");
  };

  const dispatch = useDispatch();

  const { userData } = getUserData(id);

  if (!userData) return <>Loading...</>;

  return (
    <>
      <WrapperBox>
        {isAuth && (
          <>
            <Box
              sx={{
                background:
                  "linear-gradient(to bottom, #FFFFFF 0%, #000000 130%)",
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              {userData.coverPhoto && (
                <img
                  src={userData.coverPhoto}
                  alt="nkar"
                  style={{
                    display: "flex",
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
              {loading && (
                <Box
                  width="100%"
                  position="absolute"
                  top="0"
                  height="100%"
                  sx={{
                    transition: ".2s",
                    backgroundColor: "rgba(0,0,0,.5)",
                    "&:hover": { opacity: "1" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: "9910",
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    sx={{ color: "white", width: "40px", height: "40px" }}
                  />
                </Box>
              )}

              {id === auth.currentUser!.uid && (
                <>
                  <Box
                    width="100%"
                    height="100%"
                    sx={{
                      opacity: "0",
                      transition: ".2s",
                      "&:hover": { opacity: "1" },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: "10",
                    }}
                    component="label"
                  >
                    <Typography variant="h3" color="dimgray">
                      Set a Photo
                    </Typography>
                    <input
                      type="file"
                      id="addPhotoInput"
                      hidden
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files) {
                          const file = e.target.files[0];
                          coverPhotoUpload(file);
                        }
                      }}
                    />
                  </Box>

                  <Button
                    sx={{
                      minWidth: "0",
                      position: "absolute",
                      bottom: "-20px",
                      right: 0,
                      color: "dimgray",
                      zIndex: "100",
                    }}
                    variant="contained"
                    color="inherit"
                    component="label"
                  >
                    <AddAPhoto />
                    <input
                      type="file"
                      id="addPhotoInput"
                      hidden
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files) {
                          const file = e.target.files[0];
                          coverPhotoUpload(file);
                        }
                      }}
                    />
                  </Button>
                </>
              )}
            </Box>
            <Box
              position="relative"
              sx={{ height: matches ? "183px" : float ? "230px" : "354px" }}
              width="100%"
            >
              <Box position="absolute" width="calc(100% - 30px) " top="-40px">
                <Stack
                  sx={{
                    flexDirection: matches ? "row" : "column",
                    alignItems: !float ? "center" : "initial",
                    paddingLeft: !float ? 0 : "30px",
                  }}
                  width="100%"
                  borderBottom="1px solid black"
                  paddingBottom="20px"
                >
                  <Stack
                    sx={{
                      flexDirection: float ? "row" : "column",
                      alignItems: !float ? "center" : "initial",
                      paddingLeft: !float ? 0 : "30px",
                    }}
                  >
                    <CurrentUserAvatar
                      username={userData.username}
                      photoURL={userData.photoURL}
                      id={userData.id}
                      size={"170px"}
                    />
                    <Box
                      display="flex"
                      marginLeft="20px"
                      flexDirection="column"
                      justifyContent="end"
                      alignItems="start"
                    >
                      <Typography variant="h3">{userData.username}</Typography>
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
                          <IconButton sx={{ bgcolor: "#f3f2ef" }}>
                            <Logout
                              onClick={() => {
                                setOpenDialog(true);
                              }}
                              sx={{ color: "dimgray" }}
                            />
                          </IconButton>
                        ) : (
                          <CreatePostButton sx={{ width: "100%" }}>
                            <Logout
                              onClick={() => {
                                setOpenDialog(true);
                              }}
                              sx={{ color: "dimgray" }}
                            />
                            Log out{" "}
                          </CreatePostButton>
                        )}
                        <Dialog
                          open={openDialog}
                          onClose={() => setOpenDialog(false)}
                        >
                          <DialogTitle id="dialog-title">Log out</DialogTitle>
                          <DialogContent sx={{ paddingBottom: "0" }}>
                            <DialogContentText id="dialog-description">
                              Are you sure you want to log out?
                            </DialogContentText>
                            <DialogActions>
                              <Button onClick={logOut}>Leave</Button>
                              <Button
                                autoFocus
                                onClick={() => setOpenDialog(false)}
                              >
                                Stay
                              </Button>
                            </DialogActions>
                          </DialogContent>
                        </Dialog>
                      </>
                    ) : (
                      <>
                        {inRequests && (
                          <CreatePostButton
                            sx={{ width: !matches ? "100%" : "initial" }}
                            variant="outlined"
                            onClick={() => {
                              removeRequest(id!);
                            }}
                          >
                            Pending
                          </CreatePostButton>
                        )}
                        {!inContacts && !inRequests && !inMyRequests && (
                          <CreatePostButton
                            sx={{ width: !matches ? "100%" : "initial" }}
                            variant="outlined"
                            onClick={() => {
                              sendRequest(id!);
                            }}
                          >
                            Connect
                          </CreatePostButton>
                        )}
                        {inContacts && (
                          <CreatePostButton
                            sx={{ width: !matches ? "100%" : "initial" }}
                            variant="outlined"
                            onClick={() => {
                              removeConnection(id!);
                            }}
                          >
                            Connected
                          </CreatePostButton>
                        )}
                        {inMyRequests && !inContacts && (
                          <CreatePostButton
                            sx={{ width: !matches ? "100%" : "initial" }}
                            variant="outlined"
                            onClick={() => {
                              connectBack(id!);
                            }}
                          >
                            Connect back
                          </CreatePostButton>
                        )}
                        <CreatePostButton
                          sx={{ width: !matches ? "100%" : "initial" }}
                        >
                          Message
                        </CreatePostButton>
                      </>
                    )}
                  </Stack>
                </Stack>
                <Box>
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                    >
                      {id === auth.currentUser!.uid ? (
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                          variant="scrollable"
                          scrollButtons
                          allowScrollButtonsMobile
                        >
                          <StyledTab label="Contacts" value="1" />
                          <StyledTab label="Posts" value="2" />
                          <StyledTab label="Liked Posts" value="3" />
                          <StyledTab label="Requests" value="4" />
                        </TabList>
                      ) : (
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                          variant="scrollable"
                          scrollButtons
                          allowScrollButtonsMobile
                        >
                          <StyledTab label="Contacts" value="1" />
                          <StyledTab label="Posts" value="2" />
                        </TabList>
                      )}
                    </Box>
                  </TabContext>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </WrapperBox>
      <TabContext value={value}>
        <TabPanel value="1">
          <ProfileContacts />
        </TabPanel>
        <TabPanel value="2">
          <ProfilePosts />
        </TabPanel>
        <TabPanel value="3">
          <ProfileLikedPosts />
        </TabPanel>
        <TabPanel value="4">
          <ProfileRequests />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default UserProfilePage;
