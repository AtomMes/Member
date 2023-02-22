import { updateDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { auth, db } from "./../firebase";

export const createChat = async (id: string) => {
  //check whether the group(chats in firestore) exists, if not create
  const combinedId =
    auth.currentUser!.uid > id
      ? auth.currentUser!.uid + id
      : id + auth.currentUser!.uid;
  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      //create a chat in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      //create user chats
      await updateDoc(doc(db, "userChats", auth.currentUser!.uid), {
        [combinedId + ".userInfo"]: {
          uid: id,
        },
        [combinedId + ".date"]: Date.now(),
      });

      await updateDoc(doc(db, "userChats", id), {
        [combinedId + ".userInfo"]: {
          uid: auth.currentUser!.uid,
        },
        [combinedId + ".date"]: Date.now(),
      });
    }


    

  } catch (err) {}
};
