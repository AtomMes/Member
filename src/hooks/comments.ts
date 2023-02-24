import {
  collection,
  orderBy, query,
  where
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export function useComments(id:string) {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", id),
    orderBy("date", "desc")
  );
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { comments, isLoading };
}
