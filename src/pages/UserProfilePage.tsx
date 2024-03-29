import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, styled, useMediaQuery } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WrapperBox } from "../App";
import ProfileContacts from "../components/Profile/ProfileTabs/Contacts/ProfileContacts";
import ProfileLikedPosts from "../components/Profile/ProfileTabs/Posts/ProfileLikedPosts";
import ProfilePosts from "../components/Profile/ProfileTabs/Posts/ProfilePosts";
import ProfileRequests from "../components/Profile/ProfileTabs/Requests/ProfileRequests";
import { auth } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import { useAuth } from "../hooks/useAuth";
import { theme } from "../utils/theme";
import ProfileCoverPhoto from "../components/Profile/ProfileInfo/ProfileCoverPhoto";
import ProfileInfo from "../components/Profile/ProfileInfo/ProfileInfo";

export const StyledTab = styled(Tab)(({ theme }) => ({
  color: "#047891",
  maxWidth: "none",
  minWidth: "none",
  minHeight: "none",
  textTransform: "none",
  padding: "0",
}));
const UserProfilePage: React.FC = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const { isAuth } = useAuth();
  const matches = useMediaQuery(theme.breakpoints.up(650));
  const float = useMediaQuery(theme.breakpoints.up(410));
  const { userData } = getUserData(id);
  const navigate = useNavigate();
  if (!isAuth) navigate("/login");
  if (!auth.currentUser) navigate("/login");
  if (!userData) return <></>;

  return (
    <>
      <WrapperBox>
        {isAuth && (
          <>
            <ProfileCoverPhoto id={id!} userData={userData} />
            <Box
              position="relative"
              sx={{ height: matches ? "187px" : float ? "234px" : "358px" }}
              width="100%"
            >
              <Box
                position="absolute"
                sx={{ width: !matches ? "100%" : "calc(100% - 30px)" }}
                top="-40px"
              >
                <ProfileInfo userData={userData} id={id!} />
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
