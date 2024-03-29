import {
  Alert,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../../../firebase";
import { getUserData } from "../../../../hooks/getUserData";
import { useAuthorPosts } from "../../../../hooks/useAuthorPosts";
import Post from "../../../Posts/Post/Post";

const ProfilePosts: React.FC = () => {
  const { id } = useParams();
  const { authorPosts, isLoading } = useAuthorPosts(id!);

  const { userData } = getUserData(id);

  if (!authorPosts || !userData) return <></>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10px"
      margin="0 auto"
      width="600px"
      maxWidth="100%"
    >
      {authorPosts.length ? (
        authorPosts.map((post) => (
          <Post
            authorId={post.authorId}
            image={post.image}
            text={post.text}
            date={post.date}
            id={post.id}
            likes={post.likes}
            key={post.id}
            del={true}
          />
        ))
      ) : (
        <Alert severity="info" variant="outlined" sx={{ margin: "20px auto" }}>
          {userData.id === auth.currentUser!.uid
            ? "You haven't"
            : `${userData.username} hasn't`}{" "}
          posted anything yet.
          {userData.id === auth.currentUser!.uid &&
            ` Share your thoughts or experiences by creating a
            new post.`}{" "}
        </Alert>
      )}
    </Box>
  );
};

export default ProfilePosts;
