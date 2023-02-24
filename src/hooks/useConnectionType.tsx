import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { auth, db } from "../firebase";

export const useConnectionType = (id: string | undefined) => {
  const [inRequests, setInRequests] = React.useState<boolean>(false);
  const [inContacts, setInContacts] = React.useState<boolean>(false);
  const [inMyRequests, setInMyRequests] = React.useState<boolean>(false);
  const [myContacts, setMyContacts] = React.useState<string[]>([]);

  async function getConnectionType() {
    if (id) {
      onSnapshot(doc(db, "users", id), (docSnap) => {
        setInRequests(docSnap.data()!.requests.includes(auth.currentUser!.uid));
        setInContacts(docSnap.data()!.contacts.includes(auth.currentUser!.uid));
      });
      onSnapshot(doc(db, "users", auth.currentUser!.uid), (docSnap) => {
        setMyContacts(docSnap.data()!.contacts);
        setInMyRequests(docSnap.data()!.requests.includes(id));
      });
    }
  }
  React.useEffect(() => {
    getConnectionType();
  }, [id]);

  return { myContacts, inMyRequests, inContacts, inRequests };
};
