import { Image, Send } from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ChatMessages from "./ChatMessages";

const ChatRightSide: React.FC = () => {
  const [textValue, setTextValue] = React.useState<string>("");
  const [chosenImage, setChosenImage] = React.useState<string>("");
  const [image, setImage] = React.useState<null | File>(null);

  return (
    <Stack height="100%">
      <Box
        borderBottom="1px solid rgba(50, 50, 50, .2)"
        padding="10px"
        display="flex"
        justifyContent="space-between"
      >
        <Typography>Vahe Murdayan</Typography>
        <Typography color="gray">Online</Typography>
      </Box>
      <Box overflow="auto" flex="1" padding="15px">
        <ChatMessages />
      </Box>
      {chosenImage && image && (
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
              {image.name} - {Math.floor(image.size / 1024)} kb
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
              setImage(null);
            }}
          >
            x
          </Button>
        </Stack>
      )}

      <TextField
        placeholder="Write a message..."
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
                        setImage(file);
                      }
                    }}
                  />
                </Box>
                <Box>
                  <Send />
                </Box>
              </Stack>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default ChatRightSide;
