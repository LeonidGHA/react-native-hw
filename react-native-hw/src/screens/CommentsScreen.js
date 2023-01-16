import React from "react";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FontsHooks from "../shared/hooks/fontsHooks";
import styles from "../styles/CommentsScreenStyle";

const CommentsScreen = () => {
  const { fontsLoaded, onLayoutRootView } = FontsHooks();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}></View>
      </View>
    </View>
  );
};

export default CommentsScreen;
