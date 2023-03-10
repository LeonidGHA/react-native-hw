import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import FontsHooks from "../shared/hooks/fontsHooks";

import { logIn } from "../redux/auth/auth-operations";
import { errMessage } from "../redux/auth/auth-selectors";

import styles from "../styles/LoginScreenStyle";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const selector = useSelector(errMessage);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShow] = useState(true);
  const [focusInputName, setFocusInputName] = useState("");
  const { fontsLoaded, onLayoutRootView } = FontsHooks();

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
    if (email === "" || password === "") {
      Alert.alert(" fill out all the fields of the form");
      return;
    }
    // dispatch(logIn({ email, password }));
    // if (selector !== null) {
    //   Alert.alert(`${selector}`);
    //   return;
    // }

    dispatch(logIn({ email, password }));
    resetForm();
  };
  const resetForm = () => {
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
            <Text style={styles.title}>Войти</Text>
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
              <Text style={styles.btnSubmitText}>Войти</Text>
            </TouchableOpacity>
            <Text
              style={styles.textNav}
              onPress={() => navigation.navigate("Registration")}
            >
              Нет аккаунта? Зарегистрироваться
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
