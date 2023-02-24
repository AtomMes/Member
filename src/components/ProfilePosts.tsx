import {
  ImageList,
  ImageListItem,
  ImageListItemBar, Stack
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useAuthorPosts } from "../hooks/useAuthorPosts";

const ProfilePosts: React.FC = () => {
  const { id } = useParams();

  console.log(id);

  const { authorPosts, isLoading } = useAuthorPosts(id!);
  console.log(authorPosts, isLoading);

  if (!authorPosts) return <>Loading...</>;

  return (
    <Stack>
      <ImageList variant="masonry" cols={2} gap={8}>
        {authorPosts.map((post) => (
          <ImageListItem key={post.id}>
            <img src={post.image} alt="item.title" loading="lazy" />
            <ImageListItemBar title={post.text} />
          </ImageListItem>
        ))}
      </ImageList>
      {/* <Box>
        <Masonry columns={2} spacing={2}>
          {posts.map((post) => (
            <Paper key={post.id}>
              <StyledAccordion>
                <AccordionSummary
                  // expandIcon={<ExpandMore />}
                  sx={{ overflow: "hidden", padding: "0" }}
                >
                  <img
                    src={post.image}
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
                    style={{
                      maxWidth: "100%",
                      maxHeight: "600px",
                      minHeight: "300px",
                      margin: "0 auto",
                      zIndex: "10",
                    }}
                    src={post.image}
                    alt="item.title"
                    loading="lazy"
                  />
                </AccordionSummary>
                <AccordionDetails
                  sx={{ maxWidth: "100%", overflowWrap: "anywhere" }}
                >
                  {post.text}
                </AccordionDetails>
              </StyledAccordion>
            </Paper>
          ))}
        </Masonry>
      </Box> */}
    </Stack>
  );
};

export default ProfilePosts;
