import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import Home from "./src/screens/Home";
import CommentsScreen from "./src/screens/CommentsScreen";
import MapScreen from "./src/screens/MapScreen";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />

        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
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
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
