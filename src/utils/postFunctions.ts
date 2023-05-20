import { uuidv4 } from "@firebase/util";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFileType } from "./fileType";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

export const addPost = async (image: File, textValue: string) => {
  const storage = getStorage();
  const fileRef = ref(storage, "postImages/" + uuidv4() + getFileType(image));

  await uploadBytes(fileRef, image)
    .then(async () => {
      await getDownloadURL(fileRef).then(async (imageURL) => {
        const postCollectionRef = collection(db, "posts");
        const text = textValue;

        await addDoc(postCollectionRef, {
          id: uuidv4(),
          authorId: auth.currentUser?.uid,
          text,
          image: imageURL,
          date: Date.now(),
          likes: [],
        });
      });
    })
    .catch((e) => {
      alert("Something went wrong");
    });
};
