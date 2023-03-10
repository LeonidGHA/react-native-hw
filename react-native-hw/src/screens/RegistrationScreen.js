import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Text,
  Image,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import Camera from "../components/CameraComp";

import FontsHooks from "../shared/hooks/fontsHooks";
import ModalShow from "../shared/hooks/ModalShow";
import CameraHooks from "../shared/hooks/CameraHooks";

import { registration } from "../redux/auth/auth-operations";

import styles from "../styles/RegistrationScreenStyle";

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusInputName, setFocusInputName] = useState("");
  const [showPass, setShow] = useState(true);
  const { isShow, isShowModalToggle } = ModalShow();
  const cameraHook = CameraHooks();
  const { photo, setPhoto } = cameraHook;
  const dispatch = useDispatch();
  const photoType = "Avatar";
  const { fontsLoaded, onLayoutRootView } = FontsHooks();

  const handleName = (text) => {
    setName(text);
  };
  const handleEmail = (text) => {
    setEmail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const toggleShowPassword = () => {
    setShow(!showPass);
  };

  const submitForm = () => {
    if (email === "" || password === "" || name === "") {
      Alert.alert(" fill out all the fields of the form");
      return;
    }
    dispatch(registration({ email, password, name, photo }));
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
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
          <Camera
            showModal={isShowModalToggle}
            cameraProps={cameraHook}
            photoType={photoType}
          />
        </Modal>
        <ImageBackground
          source={require("../shared/images/mountainBg.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.containerForm}>
            <View style={styles.avatarContainer}>
              {photo && (
                <Image style={styles.imagePhoto} source={{ uri: photo }} />
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
            <Text style={styles.title}>??????????????????????</Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={
                  focusInputName !== "login"
                    ? styles.input
                    : { ...styles.input, ...styles.inputFocus }
                }
                placeholder="??????????"
                placeholderTextColor="#BDBDBD"
                value={name}
                onChangeText={handleName}
                onSubmitEditing={Keyboard.dismiss}
                onFocus={() => setFocusInputName("login")}
                onBlur={() => setFocusInputName("")}
              />
            </View>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={
                  focusInputName !== "email"
                    ? styles.input
                    : { ...styles.input, ...styles.inputFocus }
                }
                placeholder="?????????? ?????????????????????? ??????????"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={handleEmail}
                onSubmitEditing={Keyboard.dismiss}
                onFocus={() => setFocusInputName("email")}
                onBlur={() => setFocusInputName("")}
              />
            </View>
            <View style={{ marginBottom: 43 }}>
              <TextInput
                style={
                  focusInputName !== "password"
                    ? styles.input
                    : { ...styles.input, ...styles.inputFocus }
                }
                placeholder="????????????"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={showPass}
                value={password}
                onChangeText={handlePassword}
                onSubmitEditing={Keyboard.dismiss}
                onFocus={() => setFocusInputName("password")}
                onBlur={() => setFocusInputName("")}
              />
              <Text style={styles.phShow} onPress={toggleShowPassword}>
                {showPass ? "????????????????" : "????????????"}
              </Text>
            </View>
            <TouchableOpacity style={styles.btnSubmit} onPress={submitForm}>
              <Text style={styles.btnSubmitText}>????????????????????????????????????</Text>
            </TouchableOpacity>
            <Text
              style={styles.textNav}
              onPress={() => navigation.navigate("Login")}
            >
              ?????? ???????? ??????????????? ??????????
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
