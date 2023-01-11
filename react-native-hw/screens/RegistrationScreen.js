import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";

import FontsHooks from "../shared/hooks/fontsHooks";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusInputName, setFocusInputName] = useState("");
  const [showPass, setShow] = useState(true);

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
    Alert.alert(
      "RegForm",
      `login: ${name} email: ${email} password: ${password}`
    );
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
        <ImageBackground
          source={require("../shared/images/mountainBg.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.containerForm}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity style={styles.btnAvatar}>
                <Image
                  style={styles.avatar}
                  source={require("../shared/images/add.png")}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Регистрация</Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={
                  focusInputName !== "login"
                    ? styles.input
                    : { ...styles.input, ...styles.inputFocus }
                }
                placeholder="Логин"
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
                placeholder="Адрес электронной почты"
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
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                secureTextEntry={showPass}
                value={password}
                onChangeText={handlePassword}
                onSubmitEditing={Keyboard.dismiss}
                onFocus={() => setFocusInputName("password")}
                onBlur={() => setFocusInputName("")}
              />
              <Text style={styles.phShow} onPress={toggleShowPassword}>
                {showPass ? "Показать" : "Скрыть"}
              </Text>
            </View>
            <TouchableOpacity style={styles.btnSubmit} onPress={submitForm}>
              <Text style={styles.btnSubmitText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <Text style={styles.textNav}>Уже есть аккаунт? Войти</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  containerForm: {
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    paddingBottom: 78,
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    left: "40%",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  btnAvatar: {
    position: "absolute",
    bottom: 14,
    right: -13,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 12.5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FF6C00",
  },
  title: {
    fontFamily: "Roboto-Medium",
    marginBottom: 33,
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: 0.01,
  },
  input: {
    fontFamily: "Roboto-Regular",
    padding: 16,
    paddingRight: 90,
    height: 50,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    placeholderTextColor: "#BDBDBD",
  },
  inputFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFf",
  },
  phShow: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  btnSubmit: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  btnSubmitText: {
    fontFamily: "Roboto-Regular",
    color: "#fff",
  },
  textNav: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    textAlign: "center",
  },
});

export default RegistrationScreen;
