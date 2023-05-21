import {
  Comment,
  Delete,
  DockRounded,
  Favorite,
  FavoriteBorder,
  Send,
  ThumbUp,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { WrapperBox } from "../../App";
import { auth, db } from "../../firebase";
import { useComments } from "../../hooks/comments";
import { getUserData } from "../../hooks/getUserData";
import { useAppSelector } from "../../hooks/redux-hooks";
import Comments from "./Comments";
import CurrentUserAvatar from "../CurrentUserAvatar";

const SnackbarAlert = React.forwardRef(function SnackbarAlert(
  props: any,
  ref: any
) {
  //stexeq chjogi incher arav bayc ena arel vor castomni snackvara stexcel(ira stylerov eli)
  return <Alert elevation={6} ref={ref} {...props} />;
});

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

interface PostProps {
  authorId: string;
  date: Date;
  id: string;
  image: string;
  likes: string[];
  text: string;
  del?: Boolean;
}

const Post: React.FC<PostProps> = ({
  authorId,
  image,
  text,
  date,
  id,
  likes,
  del,
}) => {
  const [close, setClose] = React.useState<boolean>(true);
  const [descText, setDescText] = React.useState<string>("");
  const [showAddComment, setShowAddComment] = React.useState<boolean>(false);
  const [commentText, setCommentText] = React.useState<string>("");
  const [limit, setLimit] = React.useState<number>(2);
  const [isPostLiked, setIsPostLiked] = React.useState<boolean>(
    likes.includes(auth.currentUser!.uid)
  );
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

  const createdDate = formatDistanceToNow(date) + " " + "ago";
  const { username, imageURL } = useAppSelector((state) => state.user);

  const { userData, loading } = getUserData(authorId);

  const { comments, isLoading } = useComments(id);

  React.useEffect(() => {
    setIsPostLiked(likes.includes(auth.currentUser!.uid));
  }, [likes]);

  const onLike = async () => {
    let docId = "";
    const q = query(collection(db, "posts"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => (docId = doc.id));
    const postRef = doc(db, "posts", docId);

    updateDoc(postRef, {
      likes: isPostLiked
        ? arrayRemove(auth.currentUser!.uid)
        : arrayUnion(auth.currentUser!.uid),
    }).catch((err) => alert(err.message));
  };

  React.useEffect(() => {
    setDescText(close ? text.substring(0, 20) : text);
  }, [close]);

  const onAddComment = async () => {
    if (commentText) {
      setCommentText("");
      setLimit(limit + 1);
      try {
        const commentsCollectionRef = collection(db, "comments");
        await addDoc(commentsCollectionRef, {
          postId: id,
          commentId: uuidv4(),
          authorId: auth.currentUser?.uid,
          comment: commentText,
          date: Date.now(),
        });
      } catch (err: any) {
        alert("Something went wrong");
      }
    } else {
      alert("Write some comment");
    }
  };

  const finnalyDeletePost = async (id: string) => {
    await deleteDoc(doc(db, "comments", id));
  };

  const deletePost = async () => {
    let docId = "";
    const q = query(collection(db, "posts"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => (docId = doc.id));
    await deleteDoc(doc(db, "posts", docId));

    const c = query(collection(db, "comments"), where("postId", "==", id));
    const comsSnapshot = await getDocs(c);
    comsSnapshot.forEach(async (doc) => {
      finnalyDeletePost(doc.id);
    });
  };

  const navigate = useNavigate();

  if (!userData || !auth.currentUser) {
    return <></>;
  }

  return (
    <WrapperBox>
      <UserData>
        <Box onClick={() => navigate(`/profile/${authorId}`)}>
          <CurrentUserAvatar
            username={userData.username}
            photoURL={userData.photoURL}
            id={userData.id}
          />
        </Box>
        <Typography flex="1">{userData!.username}</Typography>
        <Typography
          fontSize="14px"
          color="dimgray"
          bgcolor="#e8fdff"
          borderRadius="10px"
          padding="5px 10px"
        >
          {createdDate.replace("about", "")}
        </Typography>
        {del && (
          <>
            <Tooltip
              title="Delete"
              TransitionComponent={Zoom}
              arrow
              placement="left"
            >
              <IconButton>
                <Delete
                  onClick={() => setOpenDialog(true)}
                  sx={{ color: "#047891" }}
                />
              </IconButton>
            </Tooltip>
            <Dialog
              aria-labelledby="dialog-title" //
              aria-describedby="dialog-description" //es 2y yanm ban chen poxm bayc tox mnan //?
              open={openDialog}
              onClose={() => setOpenDialog(false)} //vor urish tex sxmen onClose a kanchvelu
            >
              <DialogTitle id="dialog-title">Delete the post?</DialogTitle>
              <DialogContent>
                <DialogContentText id="dialog-description">
                  Please note that once you delete this post, any comments or
                  interactions associated with it will also be removed.
                </DialogContentText>
                <DialogActions>
                  <Button
                    autoFocus //vor miangamic sra vra fokusy exni,
                    onClick={deletePost}
                  >
                    Submit
                  </Button>
                  <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                </DialogActions>
              </DialogContent>
            </Dialog>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
            >
              <SnackbarAlert
                onClose={() => setOpenSnackbar(false)}
                severity="success"
              >
                Post deleted successfully!
              </SnackbarAlert>
            </Snackbar>
          </>
        )}
      </UserData>
      <PostImg>
        <img
          src={image}
          style={{
            position: "absolute",
            objectFit: "cover",
            maxWidth: "100%",
            left: "120px",
            transform: "scale(2)",
            filter: "blur(5px) brightness(80%)",
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
                    color: "#047891",
                  },
                  cursor: "pointer",
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
            startIcon={
              isPostLiked ? (
                <Favorite
                  sx={{
                    color: "#047891",
                    transform: "scale(1.3)",
                    transition: ".2s",
                    "&:hover": {
                      transform: "scale(1.4)",
                    },
                  }}
                />
              ) : (
                <FavoriteBorder
                  sx={{
                    color: "#047891",
                    transform: "scale(1.2)",
                    transition: ".2s",
                    "&:hover": {
                      transform: "scale(1.4)",
                    },
                  }}
                />
              )
            }
            onClick={() => onLike()}
            sx={{
              color: "#047891",
              width: "100%",
              textAlign: "center",
              "&:hover": {
                bgcolor: "initial",
              },
            }}
          >
            {likes.length}
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
            startIcon={
              <Comment
                sx={{
                  color: "#047891",
                  transform: "scale(1.2)",
                  transition: ".2s",
                  "&:hover": {
                    transform: "scale(1.4)",
                  },
                }}
              />
            }
            sx={{
              color: "#047891",
              width: "100%",
              textAlign: "center",
              "&:hover": {
                bgcolor: "initial",
              },
            }}
            onClick={() => setShowAddComment(!showAddComment)}
          >
            {comments?.length}
          </Button>
        </Grid>
      </AboutPost>
      {showAddComment && (
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
                    <Button sx={{ minWidth: "1px" }} onClick={onAddComment}>
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
      )}
    </WrapperBox>
  );
};

export default Post;
