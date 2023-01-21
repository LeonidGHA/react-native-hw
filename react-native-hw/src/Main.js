import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";

import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import Home from "./screens/Home";
import CommentsScreen from "./screens/CommentsScreen";
import MapScreen from "./screens/MapScreen";

import { userAuth } from "./redux/auth/auth-operations";
import { isLogin, isLoad } from "./redux/auth/auth-selectors";

const MainStack = createStackNavigator();

const Main = () => {
  const [userIsAuth, setUserIsAuth] = useState(null);
  const logInUser = useSelector(isLogin);
  const isLoading = useSelector(isLoad);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuth({ userIsAuth, setUserIsAuth }));
  }, [!userIsAuth]);

  if (isLoading) {
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {logInUser ? (
          <>
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <MainStack.Screen
              name="Комментарии"
              component={CommentsScreen}
              options={({ navigation }) => ({
                title: "Комментарии",
                headerStyle: {
                  ...styles.headerContainer,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  ...styles.headerTitle,
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={styles.headerBtnBack}
                    onPress={navigation.goBack}
                  >
                    <Feather name="arrow-left" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                ),
              })}
            />
            <MainStack.Screen
              name="Карта"
              component={MapScreen}
              options={({ navigation }) => ({
                title: "Карта",
                headerStyle: {
                  ...styles.headerContainer,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  ...styles.headerTitle,
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={styles.headerBtnBack}
                    onPress={navigation.goBack}
                  >
                    <Feather name="arrow-left" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                ),
              })}
            />
          </>
        ) : (
          <>
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Registration"
              component={RegistrationScreen}
            />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.3)",
  },
  headerTitle: {
    color: "#212121",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  headerBtnBack: {
    marginLeft: 20,
  },
});

export default Main;
