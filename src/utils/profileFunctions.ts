import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { auth, db } from "../firebase";

export const addProfilePicture = async (photo: string) => {
  const storage = getStorage();
  if (auth.currentUser) {
    const fileRef = ref(
      storage,
      "userAvatars/" + auth.currentUser.uid + ".png"
    );
    try {
      await uploadString(fileRef, photo, "data_url");
      const photoURL = await getDownloadURL(fileRef);
      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });
      const refer = doc(db, "users", auth.currentUser.uid);
      await updateDoc(refer, {
        photoURL: auth.currentUser.photoURL,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
