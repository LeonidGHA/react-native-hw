import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";

import styles from "../styles/HomeStyle";

import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Публикации"
      screenOptions={({ route }) => ({
        tabBarStyle: { ...styles.tabStyle },
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarShowLabel: false,
        tabBarItemStyle: { borderRadius: 20, width: 70, height: 40 },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Создать публикацию") {
            return <Ionicons name="add" size={24} color={color} />;
          }
          if (route.name === "Профиль") {
            return <Feather name="user" size={24} color={color} />;
          }

          if (route.name === "Публикации") {
            return <Ionicons name="grid-outline" size={24} color={color} />;
          }
        },
      })}
    >
      <Tabs.Screen
        options={({ navigation }) => ({
          title: "Публикации",
          headerStyle: {
            ...styles.headerContainer,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            ...styles.headerTitle,
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.headerBtnLogOut}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        })}
        name="Публикации"
        component={PostsScreen}
      />
      <Tabs.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Создать публикацию",
          headerStyle: {
            ...styles.headerContainer,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            ...styles.headerTitle,
          },
          tabBarStyle: { display: "none" },
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
      <Tabs.Screen
        name="Профиль"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};

export default Home;
