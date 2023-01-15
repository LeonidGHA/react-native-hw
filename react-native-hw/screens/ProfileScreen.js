import React from "react";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import styles from "../styles/ProfileScreenStyle";

import FontsHooks from "../shared/hooks/fontsHooks";

import ProfileList from "../components/ProfileList";

const ProfileScreen = ({ navigation }) => {
  const { fontsLoaded, onLayoutRootView } = FontsHooks();

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
        <View style={styles.containerProfile}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity style={styles.btnAvatar}>
              <Image
                style={styles.avatar}
                source={require("../shared/images/add.png")}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btnLogOut}
            onPress={() => navigation.navigate("Login")}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.title}>Natali Romanova</Text>
          <ProfileList navigation={navigation} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
