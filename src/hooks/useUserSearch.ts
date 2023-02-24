import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase";

export const useSearch = (input: string) => {
  const [users, setUsers] = React.useState<DocumentData[]>();

  const getSearchUser = async () => {
    const q = query(
      collection(db, "users"),
      where("searchUsername", "!=", auth.currentUser!.displayName),
      where("searchUsername", ">=", input.toLowerCase()),
      where("searchUsername", "<=", input.toLowerCase() + "\uf8ff")
    );

    if (input.length > 0) {
      onSnapshot(q, (data) => {
        const dataa = data.docs.map((doc) => ({
          ...(doc.data() as Record<string, unknown>),
        })) as any;
        setUsers(dataa);
      });
    } else {
      setUsers([]);
    }
  };

  React.useEffect(() => {
    if (input) {
      (async () => {
        await getSearchUser();
      })();
    }
  }, [input]);

  return { users, getSearchUser };
};
