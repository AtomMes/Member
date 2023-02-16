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
import CurrentUserAvatar from "../components/CurrentUserAvatar";
import { StyledTab } from "../components/Navbar";
import ProfileContacts from "../components/ProfileContacts";
import ProfileLikedPosts from "../components/ProfileLikedPosts";
import ProfileMutualContact from "../components/ProfileMutualContact";
import ProfilePosts from "../components/ProfilePosts";
import ProfileRequests from "../components/ProfileRequests";
import { auth, db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { getMutualConnections } from "../hooks/useMutualConnections";
import {
  connectBack,
  removeConnection,
  removeRequest,
  sendRequest,
} from "../utils/connectionFunctions";

const CreatePostButton = styled(Button)(({ theme }) => ({
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
  const [inRequests, setInRequests] = React.useState<boolean>(false);
  const [inContacts, setInContacts] = React.useState<boolean>(false);
  const [inMyRequests, setInMyRequests] = React.useState<boolean>(false);
  const [myContacts, setMyContacts] = React.useState<string[]>([]);
  const [contacts, setContacts] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (id) {
      (async () => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        const currentUserRef = doc(db, "users", auth.currentUser!.uid);
        const currentUserDocSnap = await getDoc(currentUserRef);
        setPhotoURL(docSnap.data()!.photoURL);
        setUserName(docSnap.data()!.username);
        setContacts(docSnap.data()!.contacts);
        setMyContacts(currentUserDocSnap.data()!.contacts);
        setInRequests(docSnap.data()!.requests.includes(auth.currentUser!.uid));
        setInContacts(docSnap.data()!.contacts.includes(auth.currentUser!.uid));
        setInMyRequests(currentUserDocSnap.data()!.requests.includes(id));
      })();
    }
  }, [id]);

  const { mutualContacts } = getMutualConnections(id);

  if (!mutualContacts) return <>Loading...</>;

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
            <Box position="relative" height="183px" width="100%">
              <Box position="absolute" width="calc(100% - 30px) " top="-40px">
                <Stack
                  flexDirection="row"
                  width="100%"
                  borderBottom="1px solid black"
                  paddingBottom="20px"
                  paddingLeft="30px"
                >
                  <CurrentUserAvatar
                    username={userName}
                    photoURL={photoURL}
                    id={id!}
                    size="170px"
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
                        <CreatePostButton
                          variant="outlined"
                          startIcon={<AddCircle />}
                        >
                          Add post
                        </CreatePostButton>
                        <CreatePostButton
                          variant="outlined"
                          startIcon={<Edit />}
                        >
                          Edit profile
                        </CreatePostButton>
                      </>
                    ) : (
                      <>
                        {inRequests && (
                          <CreatePostButton
                            variant="outlined"
                            onClick={() => {
                              removeRequest(id!);
                              setInRequests(false);
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
                              setInRequests(true);
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
                              setInContacts(false);
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
                              setInContacts(true);
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
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
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
