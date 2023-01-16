import React, { useEffect, useState } from "react";

import { Text, View } from "react-native";

import FontsHooks from "../shared/hooks/fontsHooks";

import styles from "../styles/PostsScreenStyle";

import PostsList from "../components/PostsLists";

const PostsScreen = ({ navigation, route }) => {
  const { fontsLoaded, onLayoutRootView } = FontsHooks();
  const [posts, setPosts] = useState([]);
  const postData = route.params;

  useEffect(() => {
    if (postData) {
      setPosts((prevState) => [...prevState, postData]);
    }
  }, [postData]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.userContainer}>
        <View style={styles.avatarBox}></View>
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>

      <PostsList navigation={navigation} postsArr={posts} />
    </View>
  );
};

export default PostsScreen;
