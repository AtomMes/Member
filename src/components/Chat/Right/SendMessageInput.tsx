import { uuidv4 } from "@firebase/util";
import { Image, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { auth, db, storage } from "../../../firebase";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { sendMessage } from "../../../utils/chatFunctions";

const SendMessageInput = () => {
  const [text, setText] = React.useState<string>("");
  const [chosenImage, setChosenImage] = React.useState<string>("");
  const [img, setImg] = React.useState<null | File>(null);

  const currentUser = auth.currentUser;

  const data: any = useAppSelector((state) => state.chat);

  const handleSend = async () => {
    if (text || img) {
      setText("");
      setChosenImage("");
      setImg(null);
      await sendMessage({
        currentUserId: currentUser!.uid,
        dataUserId: data.user.uid!,
        chatId: data.chatId,
        img,
        text,
      });
    }
  };
  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {chosenImage && img && (
        <Stack
          flexDirection="row"
          sx={{ margin: "15px 15px 0" }}
          gap="5px"
          alignItems="center"
        >
          <img
            src={chosenImage}
            alt="image"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
          <Stack flex="1">
            <Typography color="gray" fontSize="14px">
              {img.name} - {Math.floor(img.size / 1024)} kb
            </Typography>
            <Typography color="gray" fontSize="15px">
              Attached
            </Typography>
          </Stack>
          <Button
            sx={{
              minWidth: "0",
              minHeight: "0",
              margin: "0 10px 0 0",
              padding: "10px",
              color: "black",
            }}
            onClick={() => {
              setChosenImage("");
              setImg(null);
            }}
          >
            x
          </Button>
        </Stack>
      )}
      <TextField
        placeholder="Write a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => keyDownHandler(e)}
        sx={{
          [`& fieldset`]: {
            borderRadius: 100,
          },
          margin: "15px",
        }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Stack
                alignItems="center"
                flexDirection="row"
                marginTop="4px"
                gap="5px"
              >
                <Button
                  sx={{
                    color: "#047891",
                    margin: "1px 0 0",
                    padding: 0,
                    minWidth: 0,
                  }}
                >
                  <label htmlFor="addPhotoInput">
                    <Image />
                  </label>
                </Button>
                <input
                  type="file"
                  id="addPhotoInput"
                  style={{ display: "none" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      const file = e.target.files[0];
                      setChosenImage(URL.createObjectURL(file));
                      setImg(file);
                    }
                  }}
                />

                <Button
                  sx={{
                    color: "#047891",
                    margin: " 0 0 7px",
                    padding: 0,
                    minWidth: 0,
                  }}
                >
                  <Send onClick={handleSend} />
                </Button>
              </Stack>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SendMessageInput;
