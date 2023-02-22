import { Box, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { WrapperBox } from "../App";
import ProfileRequests from "./ProfileRequests";
import RequestContact from "./ProfileRequest";
import RightbarRequestContact from "./RightbarRequestContact";
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { setChat } from "../redux/chatSlice/slice";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../hooks/getUserData";
import { connectBack, declineRequest } from "../utils/connectionFunctions";

const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}));

const StyledTypography = styled(Stack)(({ theme }) => ({
  borderRadius: "20px",
  fontSize: "18px",
  width: "35px",
  height: "25px",
  backgroundColor: "#f3f2ef",
  textAlign: "center",
}));

export interface onClickTypes {
  r: string;
  id: string;
  username?: string | undefined;
  photoURL?: string | undefined;
}

const RightBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.user);

  const onReq = async (r: string, id: string) => {
    if (r === "y") {
      connectBack(id!);
    } else if (r === "n") {
      declineRequest(id!);
    } else {
      alert("something bad happened");
    }
  };

  const onContact = async (
    r: string,
    id: string,
    username?: string | undefined,
    photoURL?: string | undefined
  ) => {
    dispatch(
      setChat({
        displayName: username,
        photoURL: photoURL,
        uid: id,
      })
    );
    navigate("/messaging");
  };

  const { userData, loading } = getUserData(id || undefined);

  if (!userData) {
    return <>Loading...</>;
  }

  return (
    <div className="sticky">
      {auth.currentUser && (
        <WrapperBox>
          {" "}
          <Box marginBottom="30px">
            <StyledStack marginBottom="10px">
              <Typography variant="h6">Requests</Typography>
              <StyledTypography>{userData.requests.length}</StyledTypography>
            </StyledStack>
            {userData!.requests?.map((req: string, i: string) => (
              <RightbarRequestContact
                onClick={onReq}
                isContact={false}
                id={req}
                key={i}
              />
            ))}
          </Box>
          <Box>
            <StyledStack marginBottom="10px">
              <Typography variant="h6" whiteSpace="nowrap">
                Contacts{" "}
              </Typography>
              <StyledTypography>{userData.contacts.length}</StyledTypography>
            </StyledStack>
            {userData!.contacts?.map((req: string, i: string) => (
              <RightbarRequestContact
                onClick={onContact}
                isContact={true}
                id={req}
                key={i}
              />
            ))}
          </Box>
        </WrapperBox>
      )}
    </div>
  );
};

export default RightBar;
