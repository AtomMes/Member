import { useCollectionData } from "react-firebase-hooks/firestore";
import { query, where, collection, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export function usePosts() {
  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { posts, isLoading };
}
