import { Box } from "@mui/material";
import React from "react";
import { auth } from "../firebase";
import { useLikedPosts } from "../hooks/useLikedPosts";
import Post from "./Post";

const ProfileLikedPosts = () => {
  const { likedPosts, isLoading } = useLikedPosts(auth.currentUser!.uid);

  console.log(likedPosts);

  if (isLoading) return <>Loading...</>;

  if (!likedPosts) {
    return <>Loading...</>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10px"
      width="550px"
      margin="0 auto"
    >
      {likedPosts.map((post) => (
        <Post
          authorId={post.authorId}
          image={post.image}
          text={post.text}
          date={post.date}
          id={post.id}
          likes={post.likes}
          key={post.id}
        />
      ))}
    </Box>
  );
};

export default ProfileLikedPosts;
