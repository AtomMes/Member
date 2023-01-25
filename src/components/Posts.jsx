import { collection, onSnapshot, doc, getDocs } from "firebase/firestore";
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
    <WrapperBox display="flex" flexDirection="column" gap="100px">
      {posts.map((post) => (
        <Post username={post.author.name} image={post.image} text={post.text} />
      ))}
    </WrapperBox>
  );
};

export default Posts;
