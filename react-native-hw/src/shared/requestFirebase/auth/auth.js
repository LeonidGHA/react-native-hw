import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { uploadPhotoToServer } from "../db/db";

export const registrationDB = async ({ email, password, name, photo }) => {
  await createUserWithEmailAndPassword(auth, email, password);
  const photoUser = await uploadPhotoToServer(photo);
  const defValuePhoto = photo ? photoUser : null;
  console.log(defValuePhoto);
  await updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: defValuePhoto,
  });

  const user = auth.currentUser;
  const userinfo = {
    uid: user.uid,
    userName: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
  };

  return userinfo;
};

export const logInDB = async (data) => {
  const { email, password } = data;
  await signInWithEmailAndPassword(auth, email, password);
  const user = auth.currentUser;
  const userinfo = {
    uid: user.uid,
    userName: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
  };

  return userinfo;
};

export const logOutDB = async () => {
  await signOut(auth);

  return;
};

export const updateProfileDb = async ({ photo }) => {
  const photoUser = await uploadPhotoToServer(photo);
  const defValuePhoto = photo ? photoUser : null;
  await updateProfile(auth.currentUser, {
    photoURL: defValuePhoto,
  });
  const user = auth.currentUser;
  const userinfo = {
    uid: user.uid,
    userName: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
  };
  return userinfo;
};

export const userAuthDb = async ({ userIsAuth, setUserIsAuth }) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserIsAuth({
          uid: user.uid,
          userName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        });
      }
    });

    return userIsAuth;
  } catch (error) {}
};
