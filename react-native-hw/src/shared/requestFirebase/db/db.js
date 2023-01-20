import { auth } from "../../firebase/config";
import { storage } from "../../firebase/config";
import { db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export const uploadPhotoToServer = async (photo) => {
  if (!photo) {
    return;
  }
  const response = await fetch(photo);
  const file = await response.blob();
  const uniqueId = nanoid(8);
  const spaceRef = ref(storage, `photoUser/${uniqueId}`);
  await uploadBytes(spaceRef, file);

  const photoUrl = await getDownloadURL(spaceRef);
  return photoUrl;
};

export const uploadPostToServer = async ({
  photo,
  title,
  place,
  location,
  userName,
  uid,
}) => {
  try {
    const photoUrl = await uploadPhotoToServer(photo);
    await addDoc(collection(db, "posts"), {
      photoUrl,
      title,
      place,
      location,
      userName,
      uid,
      like: 0,
      comments: 0,
      timestamp: serverTimestamp(),
    });
  } catch (e) {}
};

export const addComment = async ({ id, comment, userName, photoUrl }) => {
  await addDoc(collection(db, "posts", `${id}`, "comments"), {
    comment,
    userName,
    photoUrl,
    timestamp: serverTimestamp(),
    date: new Date().toLocaleString(),
  });
  const colRef = doc(db, "posts", `${id}`);
  await updateDoc(colRef, {
    comments: increment(1),
  });
};

export const addLike = async ({ id, like }) => {
  const colRef = doc(db, "posts", `${id}`);
  await updateDoc(colRef, {
    like: increment(1),
  });
};
