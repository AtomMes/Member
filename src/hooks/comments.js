import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  query,
  where,
  collection,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import { db } from "../firebase";

export function useComments(id) {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", id),
    orderBy("date", "desc")
  );
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { comments, isLoading };
}
