import {
  Comment,
  LinkedCamera,
  Send,
  ThumbUp,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import React from "react";
import { Link } from "react-router-dom";
import { WrapperBox } from "../App";
import { auth, db } from "../firebase";
import Comments from "./Comments";
import { v4 as uuidv4 } from "uuid";
import CurrentUserAvatar from "./CurrentUserAvatar";
import { useComments } from "../hooks/comments";

const UserData = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  marginBottom: "10px",
}));
const PostImg = styled(Box)(({ theme }) => ({
  maxWidth: "600px",
  display: "flex",
  position: "relative",
  placeItems: "center",
  overflow: "hidden",
}));
const PostDesc = styled(Box)(({ theme }) => ({
  width: "100%",
}));
const AboutPost = styled(Grid)(({ theme }) => ({
  width: "100%",
}));
const AddComment = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px",
  marginTop: "8px",
}));
const AddCommentInput = styled(TextField)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 100,
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

const Post = ({ author, image, text, date, id, likes }) => {
  const [close, setClose] = React.useState(true);
  const [descText, setDescText] = React.useState();
  const [showAddComment, setShowAddComment] = React.useState(true);
  const createdDate = formatDistanceToNow(date) + " " + "ago";
  const [commentText, setCommentText] = React.useState("");
  const [limit, setLimit] = React.useState(2);
  const { comments, isLoading } = useComments(id, limit);
  const [isPostLiked, setIsPostLiked] = React.useState(likes.includes(id));

  React.useEffect(() => {
    setIsPostLiked(likes.includes(id));
  }, [likes]);

  const onLike = async () => {
    let docId = null;
    const q = query(collection(db, "posts"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => (docId = doc.id));
    const postRef = doc(db, "posts", docId);

    updateDoc(postRef, {
      likes: isPostLiked ? arrayRemove(id) : arrayUnion(id),
    }).catch((err) => alert(err.message));
  };

  React.useEffect(() => {
    setDescText(close ? text.substring(0, 20) : text);
  }, [close]);

  const onAddComment = async () => {
    if (commentText) {
      setCommentText("");
      try {
        const commentsCollectionRef = collection(db, "comments");
        await addDoc(commentsCollectionRef, {
          postId: id,
          commentId: uuidv4(),
          author: {
            name: auth.currentUser?.displayName,
            id: auth.currentUser?.uid,
          },
          comment: commentText,
          date: Date.now(),
        });
      } catch (err) {
        alert(err.message);
        console.log(err);
      }
    } else {
      alert("Write some comment");
    }
  };

  return (
    <WrapperBox>
      <UserData>
        <CurrentUserAvatar />
        <Typography>{author.name}</Typography>
        <Typography fontSize="14px" color="gray">
          {createdDate.replace("about", "")}
        </Typography>
      </UserData>
      <PostImg>
        <img
          src={image}
          style={{
            position: "absolute",
            objectFit: "cover",
            maxWidth: "100%",
            transform: "scale(1.5)",
            filter: "blur(5px) brightness(40%)",
          }}
        />
        <img
          src={image}
          style={{
            maxWidth: "100%",
            maxHeight: "600px",
            margin: "0 auto",
            zIndex: "10",
          }}
        />
      </PostImg>
      <PostDesc onClick={() => setClose(!close)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
          width="100%"
        >
          <Typography
            display="flex"
            textAlign="center"
            onClick={() => setClose(!close)}
            sx={{ maxWidth: "100%", overflowWrap: "anywhere" }}
          >
            {descText}
          </Typography>
          {text.length > 20 && close && (
            <Box
              sx={{
                flex: "1",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {" "}
              <Typography flex="1">...</Typography>{" "}
              <Typography
                marginLeft="10px"
                color="gray"
                sx={{
                  "&:hover": {
                    color: "blue",
                  },
                }}
              >
                ...see more
              </Typography>
            </Box>
          )}
        </Box>
      </PostDesc>
      <AboutPost container>
        <Grid
          item
          xs={6}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Button
            startIcon={isPostLiked ? <ThumbUp /> : <ThumbUpOffAlt />}
            sx={{ color: "gray" }}
            width="100%"
            textAlign="center"
            onClick={() => onLike()}
          >
            Like
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Button
            startIcon={<Comment />}
            sx={{ color: "gray" }}
            width="100%"
            textAlign="center"
            onClick={() => setShowAddComment(!showAddComment)}
          >
            Comment
          </Button>
        </Grid>
      </AboutPost>
      {showAddComment && (
        <Stack gap="20px">
          <AddComment>
            <CurrentUserAvatar />
            <AddCommentInput
              size="small"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button sx={{ minWidth: "1px" }} onClick={onAddComment}>
                      <Send />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </AddComment>
          <Box width="100%" border=".1px solid rgba(220,220,220, .7)" />
          <Comments comments={comments} />
          <ShowMoreButton fullWidth={false} onClick={() => setLimit(limit + 2)}>
            Show more
          </ShowMoreButton>
        </Stack>
      )}
    </WrapperBox>
  );
};

export default Post;
