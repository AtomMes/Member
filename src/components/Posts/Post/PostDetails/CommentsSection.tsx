import {
  Stack,
  styled,
  Box,
  Button,
  TextField,
  InputAdornment,
  Alert,
} from "@mui/material";
import React from "react";
import CurrentUserAvatar from "../../../Shared/CurrentUserAvatar";
import { auth } from "../../../../firebase";
import { Send } from "@mui/icons-material";
import { onAddComment } from "../../../../utils/postFunctions";
import { DocumentData } from "firebase/firestore";
import Comments from "../../Comments";

const AddComment = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  gap: "5px",
  marginTop: "8px",
}));

export const AddCommentInput = styled(TextField)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 30,
  },
  width: "100%",
  padding: "0",
  margin: "0",
}));

const ShowMoreButton = styled(Button)(({ theme }) => ({
  color: "black",
  width: "fit-content",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#e6e6e6",
  },
  padding: "2px 6px",
}));

interface Props {
  id: string;
  comments?: DocumentData[];
}

const CommentsSection: React.FC<Props> = ({ comments, id }) => {
  const [limit, setLimit] = React.useState<number>(2);
  const [commentText, setCommentText] = React.useState<string>("");

  return (
    <Stack gap="20px">
      <AddComment>
        <CurrentUserAvatar
          username={auth.currentUser!.displayName}
          photoURL={auth.currentUser!.photoURL}
          id={auth.currentUser!.uid}
        />
        <AddCommentInput
          sx={{ marginLeft: "2px" }}
          size="small"
          placeholder="Add a comment..."
          multiline
          value={commentText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCommentText(e.target.value)
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  sx={{ minWidth: "1px" }}
                  onClick={() => {
                    setCommentText(""),
                      setLimit(limit + 1),
                      onAddComment(commentText, id);
                  }}
                >
                  <Send sx={{ color: "#047891" }} />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </AddComment>
      <Box width="100%" border=".1px solid rgba(220,220,220, .7)" />
      {comments!.length ? (
        <>
          {/*@ts-ignore */}
          <Comments comments={comments!} limit={limit} />
          <Stack flexDirection="row" justifyContent="space-between">
            <ShowMoreButton
              fullWidth={false}
              onClick={() => {
                if (comments!.length > limit) {
                  setLimit(limit + 2);
                }
              }}
              sx={{ color: "#047891" }}
            >
              Show more
            </ShowMoreButton>
            <ShowMoreButton
              fullWidth={false}
              onClick={() => {
                if (limit > 2) {
                  setLimit(limit - 2);
                }
              }}
              sx={{ color: "#047891" }}
            >
              Show less
            </ShowMoreButton>
          </Stack>
        </>
      ) : (
        <Alert severity="info" variant="outlined" sx={{ maxWidth: "100%" }}>
          There are currently no comments on this post yet.
        </Alert>
      )}
    </Stack>
  );
};

export default CommentsSection;
