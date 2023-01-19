import { auth } from "../../firebase/config";
import { storage } from "../../firebase/config";
import { db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  where,
  updateDoc,
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
    const docRef = await addDoc(collection(db, "posts"), {
      photoUrl,
      title,
      place,
      location,
      userName,
      uid,
      like: 0,
    });
  } catch (e) {
    console.log("Error adding document: ", e);
  }
};

export const getUserPosts = async (data) => {
  const { setPosts, userInfo } = data;
  console.log(userInfo);
  const postRef = collection(db, "posts");
  const q = query(postRef, where("uid", "==", `${userInfo.uid}`));
  onSnapshot(q, (snapshot) => {
    setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
};

export const addComment = async ({ id, comment, userName, photoUrl }) => {
  await addDoc(collection(db, "posts", `${id}`, "comments"), {
    comment,
    userName,
    photoUrl,
    date: new Date().toLocaleString("en-GB"),
  });
};

export const addLike = async ({ id, like }) => {
  const colRef = doc(db, "posts", `${id}`);
  await updateDoc(colRef, {
    like: like + 1,
  });
};
