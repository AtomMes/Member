import {
  Avatar,
  Box,
  Button,
  Stack,
  styled,
  TextField,
  Menu,
  MenuItem,
  ImageList,
  Backdrop,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { WrapperBox } from "../App";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React from "react";
import { IconButton, ListItemDecorator, Textarea } from "@mui/joy";
import {
  Check,
  FormatBold,
  FormatItalic,
  Image,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import CurrentUserAvatar from "./CurrentUserAvatar";

const CreatePostButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "400",
  width: "100%",
  color: "black",
  borderRadius: "20px",
  border: "1px solid gray",
  whiteSpace: "nowrap",
  textTransform: "none",
  justifyContent: "flex-start",
  "&:hover": {
    backgroundColor: "#e6e6e6",
  },
}));

const CreatePost = () => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [italic, setItalic] = React.useState(false);
  const [bald, setBald] = React.useState(false);
  const [textValue, setTextValue] = React.useState("");
  const [chosenImage, setChosenImage] = React.useState("");
  const [image, setImage] = React.useState("");

  const navigate = useNavigate();

  function getFileType() {
    if (image.type === "image/jpeg") {
      return "jpg";
    } else if (image.type === "image/png") {
      return "png";
    } else {
      return "other";
    }
  }

  const handleAddPost = async () => {
    setLoading(true);
    setOpen(false);
    const storage = getStorage();
    const fileRef = ref(storage, "postImages/" + uuidv4() + getFileType());

    if (image && textValue) {
      await uploadBytes(fileRef, image)
        .then(async () => {
          await getDownloadURL(fileRef)
            .then(async (imageURL) => {
              const postCollectionRef = collection(db, "posts");
              const text = textValue;
              await addDoc(postCollectionRef, {
                id: uuidv4(),
                author: {
                  name: auth.currentUser?.displayName,
                  id: auth.currentUser?.uid,
                },
                text,
                image: imageURL,
                date: Date.now(),
              });
            })
            .catch((e) => {
              console.log(e.message);
            });
          setOpen(false);
          setImage("");
          setTextValue("");
          navigate("/");
          setLoading(false);
        })
        .catch((e) => {
          console.log(e.message);
        })
        .finally(() => setLoading(false));
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <WrapperBox>
      <Stack flexDirection="row" gap={1}>
        <CurrentUserAvatar />
        <CreatePostButton variant={"outlined"} onClick={() => setOpen(true)}>
          Start a post
        </CreatePostButton>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{ width: "500px", margin: "0 auto" }}
        >
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{
              borderRadius: "md",
              boxShadow: "lg",
              minWidth: "100%",
              backgroundColor: "rgba(255,255,255, .9)",
            }}
          >
            <Stack>
              <Typography>Create a post</Typography>
              <hr />

              <Textarea
                placeholder="Type something here…"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                minRows={3}
                maxRows={5}
                startDecorator={
                  image && (
                    <img
                      src={chosenImage}
                      style={{
                        maxWidth: "600px",
                        maxHeight: "600px",
                        margin: "0 auto",
                      }}
                    />
                  )
                }
                endDecorator={
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "var(--Textarea-paddingBlock)",
                        pt: "var(--Textarea-paddingBlock)",
                        borderTop: "1px solid",
                        borderColor: "divider",
                        flex: "auto",
                      }}
                    >
                      <IconButton
                        variant="plain"
                        color="neutral"
                        onClick={() => setBald(!bald)}
                      >
                        <FormatBold />
                      </IconButton>
                      <IconButton
                        variant={italic ? "soft" : "plain"}
                        color={italic ? "primary" : "neutral"}
                        aria-pressed={italic}
                        onClick={() => setItalic(!italic)}
                      >
                        <FormatItalic />
                      </IconButton>
                      <IconButton>
                        <label for="addPhotoInput">
                          <Image />
                        </label>
                        <input
                          type="file"
                          id="addPhotoInput"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setChosenImage(URL.createObjectURL(file));
                            setImage(file);
                          }}
                        />
                      </IconButton>

                      <Button
                        sx={{ ml: "auto" }}
                        onClick={() => {
                          handleAddPost();
                        }}
                      >
                        Create
                      </Button>
                    </Box>
                  </>
                }
                sx={{
                  minWidth: 300,
                  fontWeight: bald && 700,
                  fontStyle: italic ? "italic" : "initial",
                }}
              />
            </Stack>
          </ModalDialog>
        </Modal>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </WrapperBox>
  );
};

export default CreatePost;
