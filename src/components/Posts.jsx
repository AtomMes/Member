import { Box } from "@mui/material";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { WrapperBox } from "../App";
import { db } from "../firebase";
import { setPosts } from "../redux/postsSlice/slice";
import Post from "./Post";

const Posts = () => {
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts"),
      orderBy("date", "asc"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push(doc.data());
        });
        dispatch(setPosts(list));
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const { posts } = useSelector((state) => state.posts);

  return (
    <Box display="flex" flexDirection="column" gap="10px">
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </Box>
  );
};

export default Posts;
