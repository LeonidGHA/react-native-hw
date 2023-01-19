import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../shared/firebase/config";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
} from "react-native";
import PostsList from "../components/PostsList";
import Camera from "../components/CameraComp";

import FontsHooks from "../shared/hooks/fontsHooks";
import ModalShow from "../shared/hooks/ModalShow";
import CameraHooks from "../shared/hooks/CameraHooks";

import { logOutUser } from "../redux/auth/auth-operations";
import { dataUser } from "../redux/auth/auth-selectors";

import { updateProfileUser } from "../redux/auth/auth-operations";

import styles from "../styles/ProfileScreenStyle";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const userInfo = useSelector(dataUser);
  const dispatch = useDispatch();
  const { fontsLoaded, onLayoutRootView } = FontsHooks();
  const { isShow, isShowModalToggle } = ModalShow();
  const cameraHook = CameraHooks();
  const { photo, setPhoto } = cameraHook;
  const photoType = "Avatar";

  useEffect(() => {
    const postRef = collection(db, "posts");
    const q = query(postRef, where("uid", "==", `${userInfo.uid}`));
    const unscrible = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unscrible();
  }, []);
  useEffect(() => {
    if (photo) {
      dispatch(updateProfileUser({ photo }));
    }
  }, [photo]);
  // console.log(posts);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground
        source={require("../shared/images/mountainBg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Modal
          animationType="fade"
          transparent={true}
          visible={isShow}
          onRequestClose={() => isShowModalToggle()}
        >
          <Camera
            showModal={isShowModalToggle}
            cameraProps={cameraHook}
            photoType={photoType}
          />
        </Modal>
        <View style={styles.containerProfile}>
          <View style={styles.avatarContainer}>
            {photo ? (
              <Image style={styles.imagePhoto} source={{ uri: photo }} />
            ) : (
              <Image
                style={styles.imagePhoto}
                source={{ uri: `${userInfo.photoUrl}` }}
              />
            )}
            {!photo ? (
              <TouchableOpacity
                style={styles.btnAvatarAdd}
                onPress={() => isShowModalToggle()}
              >
                <Image
                  style={styles.avatar}
                  source={require("../shared/images/add.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnAvatarRemove}
                onPress={() => setPhoto(null)}
              >
                <Feather name="x" size={13} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.btnLogOut}
            onPress={() => dispatch(logOutUser())}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.title}>{userInfo.userName}</Text>
          {posts.length > 0 && (
            <PostsList navigation={navigation} dataPosts={posts} />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
