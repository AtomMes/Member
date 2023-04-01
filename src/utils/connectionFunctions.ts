import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./../firebase";
import { createChat } from "./chatFunctions";

export const removeConnection = async (userId: string) => {
  if (userId) {
    try {
      const userRef = doc(db, "users", userId);
      const currentUserRef = doc(db, "users", auth.currentUser!.uid);
      await updateDoc(userRef, {
        contacts: arrayRemove(auth.currentUser!.uid),
      });
      await updateDoc(currentUserRef, {
        contacts: arrayRemove(userId),
      });
    } catch (error: any) {
      alert('Something went wrong');
    }
  }
};

export const removeRequest = async (userId: string) => {
  if (userId) {
    const refer = doc(db, "users", userId);
    await updateDoc(refer, {
      requests: arrayRemove(auth.currentUser!.uid),
    });
  }
};

export const connectBack = async (userId: string) => {
  if (userId) {
    const userRef = doc(db, "users", userId);
    const currentUserRef = doc(db, "users", auth.currentUser!.uid);
    await updateDoc(userRef, {
      contacts: arrayUnion(auth.currentUser!.uid),
    });
    await updateDoc(currentUserRef, {
      contacts: arrayUnion(userId),
      requests: arrayRemove(userId),
    });
  }
};

export const sendRequest = async (userId: string) => {
  if (userId) {
    const refer = doc(db, "users", userId);
    await updateDoc(refer, {
      requests: arrayUnion(auth.currentUser!.uid),
    });
  }
  createChat(userId);
};

export const declineRequest = async (userId: string) => {
  if (userId) {
    const currentUserRef = doc(db, "users", auth.currentUser!.uid);
    await updateDoc(currentUserRef, {
      requests: arrayRemove(userId),
    });
  }
};
