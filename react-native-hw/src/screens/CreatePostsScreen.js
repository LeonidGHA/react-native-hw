import React from "react";
import { useState } from "react";
import {
  Text,
  Modal,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import FontsHooks from "../shared/hooks/fontsHooks";
import CameraHooks from "../shared/hooks/CameraHooks";
import ModalShow from "../shared/hooks/ModalShow";
import LocationHooks from "../shared/hooks/LocationHooks";
import { Feather, Ionicons } from "@expo/vector-icons";

import Camera from "../components/CameraComp";
import styles from "../styles/CreatePostsScreenStyle";

const CreatePostsScreen = ({ navigation }) => {
  const { fontsLoaded, onLayoutRootView } = FontsHooks();
  const { isShow, isShowModalToggle } = ModalShow();
  const cameraHook = CameraHooks();
  const { photo, setPhoto } = cameraHook;
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const { location, getLocation } = LocationHooks();

  const handleTitle = (text) => {
    setTitle(text);
  };

  const handlePlace = (text) => {
    setPlace(text);
  };

  const validatePostForm = () => {
    if (title === "" || place === "" || photo === null) {
      return true;
    }
    return false;
  };

  const createPostSubmit = () => {
    getLocation();
    Alert.alert(
      `Title: ${title} place:${place} Location:${location.coords.latitude} , ${location.coords.longitude}`
    );
    const data = { uri: photo, title, place, location };
    clearPosts();
    navigation.navigate("Публикации", data);
  };

  const clearPosts = () => {
    setPhoto(null);
    setTitle("");
    setPlace("");
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={isShow}
          onRequestClose={() => isShowModalToggle()}
        >
          <Camera showModal={isShowModalToggle} cameraProps={cameraHook} />
        </Modal>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            {photo && (
              <Image style={styles.imagePhoto} source={{ uri: photo }} />
            )}
            <TouchableOpacity
              style={
                photo
                  ? { ...styles.imageBtn, ...styles.imageBtnEnabled }
                  : { ...styles.imageBtn, ...styles.imageBtnDisabled }
              }
              onPress={() => isShowModalToggle()}
            >
              <Ionicons
                name="camera"
                size={24}
                color={photo ? "#fff" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.imageContainerText}>
            {photo ? "Редактировать фото" : "Загрузите фото"}
          </Text>
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
          disabled={validatePostForm()}
          onPress={() => createPostSubmit()}
          style={
            validatePostForm()
              ? { ...styles.publishBtn, ...styles.disabledBtn }
              : { ...styles.publishBtn, ...styles.enabledBtn }
          }
        >
          <Text
            style={
              validatePostForm()
                ? { ...styles.publishBtnText, ...styles.disabledBtnText }
                : { ...styles.publishBtnText, ...styles.enabledBtnText }
            }
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => clearPosts()}>
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
