import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { auth, db } from "../../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { getFileType } from "../../../utils/fileType";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import coverPhoto from "../../images/1569699848732.jpeg";

import { AddAPhoto } from "@mui/icons-material";

interface Props {
  id: string;
  userData: DocumentData;
}

const ProfileCoverPhoto: React.FC<Props> = ({ id, userData }) => {
  const [progress, setProgress] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<Boolean>(false);

  const coverPhotoUpload = async (image: File) => {
    if (image) {
      setProgress(10);
      setLoading(true);
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

  return (
    <Box
      sx={{
        width: "100%",
        height: "200px",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <img
        src={userData.coverPhoto ? userData.coverPhoto : coverPhoto}
        alt="PFP"
        style={{
          display: "flex",
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          opacity: userData.coverPhoto ? "1" : ".3",
        }}
      />
      {!userData.coverPhoto && (
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "53%",
            transform: "translate(-50%, -50%)",
            letterSpacing: "25px",
            fontWeight: "500",
            color: "white",
            fontSize: "50px",
          }}
        >
          MEMBER
        </Typography>
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
              bottom: "10px",
              right: "10px",
              color: "dimgray",
              zIndex: "100",
              bgcolor: "white",
              transition: ".2s",
              "&:hover": {
                backgroundColor: "#00637a",
                transform: "scale(1.1)",
              },
              backgroundColor: "#047891",
            }}
            variant="contained"
            component="label"
            size="small"
          >
            <AddAPhoto fontSize="small" sx={{ color: "white" }} />
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
  );
};

export default ProfileCoverPhoto;
