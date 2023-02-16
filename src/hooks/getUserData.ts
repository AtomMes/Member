import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../firebase";
export const getUserData = (id: string | undefined) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [userData, setUserData] = React.useState<DocumentData>();

  async function getUserDataById() {
    if (id) {
      setLoading(true);
      onSnapshot(doc(db, "users", id), (doc) => {
        setUserData(doc.data());
      });
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getUserDataById();
  }, [id]);

  return { userData, loading };
};
