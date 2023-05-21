import React, { FC } from "react";

import {
  connectBack,
  removeConnection,
  removeRequest,
  sendRequest,
} from "../../utils/connectionFunctions";
import { removeUser } from "../../redux/userSlice/slice";
import { setChat } from "../../redux/chatSlice/slice";
import { useConnectionType } from "../../hooks/useConnectionType";
import {
  Box,
  Button,
  Tooltip,
  Zoom,
  styled,
  useMediaQuery,
} from "@mui/material";
import { theme } from "../../utils/theme";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { Lock } from "@mui/icons-material";

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

const ProfileConnectionButtons: FC<Props> = ({ userData, id }) => {
  const [openTooltip, setOpenTooltip] = React.useState<boolean>(false);
  const { myContacts, inMyRequests, inContacts, inRequests } =
    useConnectionType(id);

  const matches = useMediaQuery(theme.breakpoints.up(650));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 1000);
  };

  return (
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
              border: !inContacts ? "1px solid gray" : "1px solid #047891",
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
  );
};

export default ProfileConnectionButtons;
