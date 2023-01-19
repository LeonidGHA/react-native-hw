import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Text, View, Image, SafeAreaView, FlatList } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../shared/firebase/config";

import PostsList from "../components/PostsList";
import FontsHooks from "../shared/hooks/fontsHooks";

import { dataUser } from "../redux/auth/auth-selectors";

import styles from "../styles/PostsScreenStyle";

const PostsScreen = ({ navigation, route }) => {
  const userInfo = useSelector(dataUser);
  const { fontsLoaded, onLayoutRootView } = FontsHooks();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postRef = collection(db, "posts");
    const unscrible = onSnapshot(postRef, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unscrible();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.userContainer}>
        <View style={styles.avatarBox}>
          <Image
            style={styles.image}
            source={{
              uri: userInfo.photoUrl,
            }}
          />
        </View>
        <View>
          <Text style={styles.userName}>{userInfo.userName}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
        </View>
      </View>
      {posts.length > 0 && (
        <PostsList navigation={navigation} dataPosts={posts} />
      )}
    </View>
  );
};

export default PostsScreen;
