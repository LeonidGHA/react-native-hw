import React from "react";
import { useState } from "react";
import {
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

import styles from "../styles/RegistrationScreenStyle";

import FontsHooks from "../shared/hooks/fontsHooks";

const RegistrationScreen = ({ navigation }) => {
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
            <Text
              style={styles.textNav}
              onPress={() => navigation.navigate("Login")}
            >
              Уже есть аккаунт? Войти
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
