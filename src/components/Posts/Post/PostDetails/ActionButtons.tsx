import { Comment, Favorite, FavoriteBorder } from "@mui/icons-material";
import { styled, Grid, Button } from "@mui/material";
import React from "react";
import { onLike } from "../../../../utils/postFunctions";
import { auth } from "../../../../firebase";
import { DocumentData } from "firebase/firestore";

interface Props {
  likes: string[];
  comments?: DocumentData[];
  id: string;
  showAddComment: boolean;
  setShowAddComment: (arg1: boolean) => void;
}

const ActionButtons: React.FC<Props> = ({
  likes,
  id,
  comments,
  showAddComment,
  setShowAddComment,
}) => {
  const [isPostLiked, setIsPostLiked] = React.useState<boolean>(
    likes.includes(auth.currentUser!.uid)
  );

  React.useEffect(() => {
    setIsPostLiked(likes.includes(auth.currentUser!.uid));
  }, [likes]);
  return (
    <Grid container width="100%">
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
          onClick={() => onLike(id, isPostLiked)}
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
    </Grid>
  );
};

export default ActionButtons;
