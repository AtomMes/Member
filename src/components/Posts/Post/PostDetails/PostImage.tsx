import { styled, Box } from "@mui/material";
import React from "react";

const PostImg = styled(Box)(({ theme }) => ({
  maxWidth: "600px",
  display: "flex",
  position: "relative",
  placeItems: "center",
  overflow: "hidden",
}));

interface Props {
  image: string;
}

const PostImage: React.FC<Props> = ({ image }) => {
  return (
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
  );
};

export default PostImage;
