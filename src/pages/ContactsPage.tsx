import { Search, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { AddCommentInput } from "../components/Post";
import ProfileContact from "../components/ProfileContact";
import ProfileContacts from "../components/ProfileContacts";
import { auth } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import { useConnectionType } from "../hooks/useConnectionType";
import { useSearch } from "../hooks/useUserSearch";

const ContactsPage: React.FC = () => {
  const [commentText, setCommentText] = React.useState<string>("");
  const { users, getSearchUser } = useSearch(commentText);

  const { myContacts } = useConnectionType("id");

  React.useEffect(() => {
    (async () => {
      if (commentText) {
        await getSearchUser();
      }
    })();
  }, [commentText]);

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
      {commentText && (
        <Box marginTop="20px">
          <Grid container spacing="20px" sx={{ padding: 0 }}>
            {users
              ?.filter((user) => !myContacts.includes(user.id))
              .map((user: DocumentData) => {
                if (user.id !== auth.currentUser!.uid) {
                  return <ProfileContact contact={user.id} key={user.id} />;
                }
              })}
          </Grid>
        </Box>
      )}
      <Box>
        <Typography variant="h4" margin="25px 0">
          Contacts
        </Typography>
        <ProfileContacts />
      </Box>
    </>
  );
};

export default ContactsPage;
