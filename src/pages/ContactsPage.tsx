import { Search, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { AddCommentInput } from "../components/Post";
import ProfileContacts from "../components/ProfileContacts";

const ContactsPage: React.FC = () => {
  const [commentText, setCommentText] = React.useState<string>("");

  return (
    <>
      <Box>
        {/* <Paper> */}
        <AddCommentInput
          size="small"
          placeholder="Search for a user..."
          value={commentText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCommentText(e.target.value)
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button sx={{ minWidth: "1px" }}>
                  <Search />
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{ width: "350px" }}
        />
        {/* </Paper> */}
      </Box>
      <Box>
        {/* <Paper sx={{ marginBottom: "15px", padding: "10px" }}> */}
        <Typography variant="h4">Contacts</Typography>
        {/* </Paper> */}
        <ProfileContacts />
      </Box>
    </>
  );
};

export default ContactsPage;
