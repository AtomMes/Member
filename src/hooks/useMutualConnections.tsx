import { doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase";

export const getMutualConnections = (id: string | undefined) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [mutualContacts, setMutualContacts] = React.useState<string[]>([]);

  async function getMutualConnection() {
    if (id) {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      const currentUserRef = doc(db, "users", auth.currentUser!.uid);
      const currentUserDocSnap = await getDoc(currentUserRef);
      setMutualContacts(
        docSnap
          .data()!
          .contacts.filter((element: string) =>
            currentUserDocSnap.data()!.contacts.includes(element)
          )
      );
    }
  }

  React.useEffect(() => {
    getMutualConnection();
  }, [id]);

  return { mutualContacts, loading };
};
