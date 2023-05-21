import {
  AvatarGroup,
  Box,
  Button,
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
import { theme } from "../../utils/theme";
import { DocumentData } from "firebase/firestore";
import { useConnectionType } from "../../hooks/useConnectionType";
import { getMutualConnections } from "../../hooks/useMutualConnections";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileActionButtons from "./ProfileActionButtons";
import ProfileConnectionButtons from "./ProfileConnectionButtons";

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
  userData: DocumentData;
  id: string;
}

const ProfileInfo: React.FC<Props> = ({ userData, id }) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const matches = useMediaQuery(theme.breakpoints.up(650));
  const float = useMediaQuery(theme.breakpoints.up(410));
  const { myContacts } = useConnectionType(id);
  const { mutualContacts } = getMutualConnections(id);

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
          <ProfileActionButtons />
        ) : (
          <ProfileConnectionButtons userData={userData} id={id} />
        )}
      </Stack>
    </Stack>
  );
};

export default ProfileInfo;
