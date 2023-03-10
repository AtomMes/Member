import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export function useLikedPosts(id: string) {
  const q = query(
    collection(db, "posts"),
    where("likes", "array-contains", id),
    orderBy("date", "desc")
  );
  const [likedPosts, isLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { likedPosts, isLoading };
}
