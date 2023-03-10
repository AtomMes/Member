import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export function useAuthorPosts(id: string) {
  const q = query(
    collection(db, "posts"),
    where("authorId", "==", id),
    orderBy("date", "desc")
  );
  const [authorPosts, isLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { authorPosts, isLoading };
}
