import { uuidv4 } from "@firebase/util";
import { Image, Send } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Button,
  Typography,
  tabClasses,
} from "@mui/material";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { auth, db, storage } from "../firebase";
import { useAppSelector } from "../hooks/redux-hooks";

const SendMessageInput = () => {
  const [text, setText] = React.useState<string>("");
  const [chosenImage, setChosenImage] = React.useState<string>("");
  const [img, setImg] = React.useState<null | File>(null);

  const currentUser = auth.currentUser;

  const data = useAppSelector((state) => state.chat);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuidv4());

      const uploadTask = uploadBytesResumable(storageRef, img);


      setText("");
      setImg(null);
      setChosenImage("");

      uploadTask.on(
        //@ts-ignore
        (error: any) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              console.log("ste hasanq");
              try {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: currentUser!.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
                console.log("normaler");
              } catch (error: any) {
                console.log(error);
                alert(error.message);
              }
              console.log("update arav");
            }
          );
        }
      );
    } else {
      setText("");
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser!.uid,
          date: Date.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser!.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: Date.now(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid!), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: Date.now(),
    });
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
                <Box>
                  <label htmlFor="addPhotoInput">
                    <Image />
                  </label>
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
                </Box>
                <Box>
                  <Send onClick={handleSend} />
                </Box>
              </Stack>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SendMessageInput;
