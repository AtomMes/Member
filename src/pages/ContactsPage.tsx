import { Search, Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { DocumentData } from "firebase/firestore";
import React from "react";
import ProfileContact from "../components/ProfileContact";
import ProfileContacts from "../components/ProfileContacts";
import { auth } from "../firebase";
import { getUserData } from "../hooks/getUserData";
import { useConnectionType } from "../hooks/useConnectionType";
import { useSearch } from "../hooks/useUserSearch";

const SearchUserInput = styled(TextField)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 100,
  },
  width: "100%",
  padding: "0",
  margin: "0",
}));

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
        <SearchUserInput
          size="small"
          placeholder="Search for a user..."
          sx={{ width: "350px", maxWidth: "100%" }}
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
