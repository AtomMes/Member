import { Comment, Send, ThumbUp, ThumbUpOffAlt } from "@mui/icons-material";
import {
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
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { WrapperBox } from "../App";
import { auth, db } from "../firebase";
import { useComments } from "../hooks/comments";
import { getUserData } from "../hooks/getUserData";
import { useAppSelector } from "../hooks/redux-hooks";
import Comments from "./Comments";
import CurrentUserAvatar from "./CurrentUserAvatar";

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
export const AddCommentInput = styled(TextField)(({ theme }) => ({
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

interface PostProps {
  authorId: string;
  date: Date;
  id: string;
  image: string;
  likes: string[];
  text: string;
}

const Post: React.FC<PostProps> = ({
  authorId,
  image,
  text,
  date,
  id,
  likes,
}) => {
  const [close, setClose] = React.useState<boolean>(true);
  const [descText, setDescText] = React.useState<string>("");
  const [showAddComment, setShowAddComment] = React.useState<boolean>(false);
  const [commentText, setCommentText] = React.useState<string>("");
  const [limit, setLimit] = React.useState<number>(2);
  const [isPostLiked, setIsPostLiked] = React.useState<boolean>(
    likes.includes(auth.currentUser!.uid)
  );

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
        alert(err.message);
        console.log(err);
      }
    } else {
      alert("Write some comment");
    }
  };

  const navigate = useNavigate();

  if (!userData) {
    return <>Loading....</>;
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
        <Typography>{userData!.username}</Typography>
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
            onClick={() => onLike()}
            sx={{ color: "gray", width: "100%", textAlign: "center" }}
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
            startIcon={<Comment />}
            sx={{ color: "gray", width: "100%", textAlign: "center" }}
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
              username={username}
              photoURL={imageURL}
              id={auth.currentUser!.uid}
            />
            <AddCommentInput
              size="small"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCommentText(e.target.value)
              }
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
          {/*@ts-ignore */}
          <Comments comments={comments!} limit={limit} />
          <Stack flexDirection="row" justifyContent="space-between">
            <ShowMoreButton
              fullWidth={false}
              onClick={() => {
                if (comments!.length > limit) {
                  setLimit(limit + 2);
                  console.log(limit);
                }
              }}
            >
              Show more
            </ShowMoreButton>
            <ShowMoreButton
              fullWidth={false}
              onClick={() => {
                if (limit > 2) {
                  setLimit(limit - 2);
                  console.log(limit);
                }
              }}
            >
              Show less
            </ShowMoreButton>
          </Stack>
        </Stack>
      )}
    </WrapperBox>
  );
};

export default Post;
