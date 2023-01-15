import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import FontsHooks from "../shared/hooks/fontsHooks";
import styles from "../styles/CreatePostsScreenStyle";

const CreatePostsScreen = ({ navigation }) => {
  const { fontsLoaded, onLayoutRootView } = FontsHooks();
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");

  const handleTitle = (text) => {
    setTitle(text);
  };

  const handlePlace = (text) => {
    setPlace(text);
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <TouchableOpacity style={styles.imageBtn}>
              <Ionicons name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <Text style={styles.imageContainerText}>Загрузите фото</Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <TextInput
            style={styles.inputTitle}
            placeholder="Название..."
            placeholderTextColor="#BDBDBD"
            value={title}
            onChangeText={handleTitle}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <View style={{ marginBottom: 32 }}>
          <TextInput
            style={styles.inputPlace}
            placeholder="Местность..."
            placeholderTextColor="#BDBDBD"
            value={place}
            onChangeText={handlePlace}
            onSubmitEditing={Keyboard.dismiss}
          />
          <View style={styles.inputIcon}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </View>
        </View>
        <TouchableOpacity
          style={{ ...styles.publishBtn, ...styles.disabledBtn }}
        >
          <Text style={{ ...styles.publishBtnText, ...styles.disabledBtnText }}>
            Опубликовать
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => navigation.navigate("Публикации")}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
