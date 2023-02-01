import { useCollectionData } from "react-firebase-hooks/firestore";
import { query, where, collection, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export function usePosts() {
  const q = query(collection(db, "comments"), orderBy("date", "asc"));
  const [posts, isLoading, error] = useCollectionData(q);

  return { posts, isLoading };
}
