import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { getFileType } from "./fileType";

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
  } catch (err) {
    alert("Something went wrong");
  }
};

export const sendMessage = async ({
  currentUserId,
  dataUserId,
  chatId,
  img,
  text,
}: {
  currentUserId: string;
  dataUserId: string;
  chatId: string;
  img: File | null;
  text: string;
}) => {
  if (img) {
    const storage = getStorage();
    const fileRef = ref(storage, "postImages/" + uuidv4() + getFileType(img));

    await uploadBytes(fileRef, img).then(async () => {
      await getDownloadURL(fileRef).then(async (imageURL) => {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            text,
            senderId: currentUserId,
            date: Date.now(),
            img: imageURL,
          }),
        });
      });
    });
  } else {
    await updateDoc(doc(db, "chats", chatId), {
      messages: arrayUnion({
        id: uuidv4(),
        text,
        senderId: currentUserId,
        date: Date.now(),
      }),
    });
  }

  await updateDoc(doc(db, "userChats", currentUserId), {
    [chatId + ".lastMessage"]: {
      text,
    },
    [chatId + ".date"]: Date.now(),
  });

  await updateDoc(doc(db, "userChats", dataUserId), {
    [chatId + ".lastMessage"]: {
      text,
    },
    [chatId + ".date"]: Date.now(),
  });
};
