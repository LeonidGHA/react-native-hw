import React from "react";

import { Text, View } from "react-native";

import FontsHooks from "../shared/hooks/fontsHooks";

import styles from "../styles/PostsScreenStyle";

import PostsList from "../components/PostsLists";

const PostsScreen = ({ navigation }) => {
  const { fontsLoaded, onLayoutRootView } = FontsHooks();

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

      <PostsList navigation={navigation} />
    </View>
  );
};

export default PostsScreen;
