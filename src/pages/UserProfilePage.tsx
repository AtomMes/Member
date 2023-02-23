import { Add, AddCircle, Edit } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
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
import { useAuth } from "../hooks/useAuth";
import { useConnectionType } from "../hooks/useConnectionType";
import { getMutualConnections } from "../hooks/useMutualConnections";
import {
  connectBack,
  removeConnection,
  removeRequest,
  sendRequest,
} from "../utils/connectionFunctions";
import { theme } from "../utils/theme";

export const CreatePostButton = styled(Button)(({ theme }) => ({
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { id } = useParams();

  const { isAuth } = useAuth();

  const navigate = useNavigate();

  if (!isAuth) navigate("/login");

  if (!auth.currentUser) navigate("/login");

  const [userName, setUserName] = React.useState<string>("");
  const [photoURL, setPhotoURL] = React.useState<string>("");

  const { myContacts, inMyRequests, inContacts, inRequests } =
    useConnectionType(id);

  React.useEffect(() => {
    if (id) {
      (async () => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        setPhotoURL(docSnap.data()!.photoURL);
        setUserName(docSnap.data()!.username);
      })();
    }
  }, [id]);

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
            ></Box>
            <Box
              position="relative"
              sx={{ height: float ? "183px" : "309px" }}
              width="100%"
            >
              <Box position="absolute" width="calc(100% - 30px) " top="-40px">
                <Stack
                  sx={{
                    flexDirection: float ? "row" : "column",
                    alignItems: !float ? "center" : "initial",
                    paddingLeft: !float ? 0 : "30px",
                  }}
                  width="100%"
                  borderBottom="1px solid black"
                  paddingBottom="20px"
                >
                  <CurrentUserAvatar
                    username={userName}
                    photoURL={photoURL}
                    id={id!}
                    size={"170px"}
                  />
                  <Box
                    display="flex"
                    marginLeft="20px"
                    flexDirection="column"
                    justifyContent="end"
                    alignItems="start"
                  >
                    <Typography variant="h3">{userName}</Typography>
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
                  <Stack
                    flexDirection="row"
                    alignItems="end"
                    justifyContent="end"
                    width="100%"
                    gap="10px"
                  >
                    {id === auth.currentUser!.uid ? (
                      <>
                        <CreatePost />
                        {matches ? (
                          <CreatePostButton
                            variant="outlined"
                            startIcon={<Edit />}
                          >
                            {matches && "Edit Profile"}
                          </CreatePostButton>
                        ) : (
                          <Button
                            sx={{
                              color: "black",
                              display: disButtons ? "initial" : "none",
                            }}
                          >
                            <Edit />
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        {inRequests && (
                          <CreatePostButton
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
                            variant="outlined"
                            onClick={() => {
                              connectBack(id!);
                            }}
                          >
                            Connect back
                          </CreatePostButton>
                        )}
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
                        width: !float ? "100%" : "400px",
                      }}
                    >
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
