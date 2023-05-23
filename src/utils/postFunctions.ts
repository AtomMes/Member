import { uuidv4 } from "@firebase/util";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFileType } from "./fileType";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

const deleteComments = async (id: string) => {
  await deleteDoc(doc(db, "comments", id));
};

export const deletePost = async (id: string) => {
  let docId = "";
  const q = query(collection(db, "posts"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => (docId = doc.id));
  await deleteDoc(doc(db, "posts", docId));

  const c = query(collection(db, "comments"), where("postId", "==", id));
  const comsSnapshot = await getDocs(c);
  comsSnapshot.forEach(async (doc) => {
    deleteComments(doc.id);
  });
};

export const onLike = async (id: string, isPostLiked: boolean) => {
  let docId = "";
  const q = query(collection(db, "posts"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => (docId = doc.id));
  const postRef = doc(db, "posts", docId);

  updateDoc(postRef, {
    likes: isPostLiked
      ? arrayRemove(auth.currentUser!.uid)
      : arrayUnion(auth.currentUser!.uid),
  }).catch((err) => alert(err.message));
};

export const onAddComment = async (commentText: string, id: string) => {
  if (commentText) {
    try {
      const commentsCollectionRef = collection(db, "comments");
      await addDoc(commentsCollectionRef, {
        postId: id,
        commentId: uuidv4(),
        authorId: auth.currentUser?.uid,
        comment: commentText,
        date: Date.now(),
      });
    } catch (err: any) {
      alert("Something went wrong");
    }
  } else {
    alert("Write some comment");
  }
};

