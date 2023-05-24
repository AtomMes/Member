import React from "react";
import { WrapperBox } from "../../../App";
import { auth } from "../../../firebase";
import { useComments } from "../../../hooks/comments";
import { getUserData } from "../../../hooks/getUserData";
import { getDate } from "../../../utils/getDate";
import UserData from "./PostDetails/UserData";
import PostImage from "./PostDetails/PostImage";
import Description from "./PostDetails/Description";
import ActionButtons from "./PostDetails/ActionButtons";
import CommentsSection from "./PostDetails/CommentsSection";

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
  const [showAddComment, setShowAddComment] = React.useState<boolean>(false);
  const { userData } = getUserData(authorId);
  const createdDate = getDate(date);
  const { comments } = useComments(id);

  if (!userData || !auth.currentUser) {
    return <></>;
  }

  return (
    <WrapperBox>
      <UserData
        authorId={authorId}
        userData={userData}
        createdDate={createdDate}
        id={id}
        del={del}
      />
      <PostImage image={image} />
      <Description text={text} />
      <ActionButtons
        likes={likes}
        id={id}
        comments={comments}
        showAddComment={showAddComment}
        setShowAddComment={setShowAddComment}
      />

      {showAddComment && <CommentsSection id={id} comments={comments} />}
    </WrapperBox>
  );
};

export default Post;
