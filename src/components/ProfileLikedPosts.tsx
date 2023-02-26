import { Box, Alert } from "@mui/material";
import { auth } from "../firebase";
import { useLikedPosts } from "../hooks/useLikedPosts";
import Post from "./Post";

const ProfileLikedPosts = () => {
  const { likedPosts, isLoading } = useLikedPosts(auth.currentUser!.uid);

  console.log(likedPosts);

  if (isLoading) return <></>;

  if (!likedPosts) {
    return <></>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10px"
      margin="0 auto"
      width="600px"
      maxWidth="100%"
    >
      {likedPosts.length ? (
        likedPosts.map((post) => (
          <Post
            authorId={post.authorId}
            image={post.image}
            text={post.text}
            date={post.date}
            id={post.id}
            likes={post.likes}
            key={post.id}
          />
        ))
      ) : (
        <Alert severity="info" variant="outlined" sx={{ margin: "20px auto" }}>
          You haven't liked any posts yet. Browse through posts and like the
          ones that you find interesting or helpful.
        </Alert>
      )}
    </Box>
  );
};

export default ProfileLikedPosts;
