import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "../shared/firebase/config";
import { Feather } from "@expo/vector-icons";

import FontsHooks from "../shared/hooks/fontsHooks";

import { addComment } from "../shared/requestFirebase/db/db";
import { dataUser } from "../redux/auth/auth-selectors";

import styles from "../styles/CommentsScreenStyle";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { userName, photoUrl } = useSelector(dataUser);
  const { id, urlPhoto, uid } = route.params;
  const { fontsLoaded, onLayoutRootView } = FontsHooks();
  // console.log(allComments);

  useEffect(() => {
    const postRef = collection(db, "posts", `${id}`, "comments");

    const unscrible = onSnapshot(postRef, (snapshot) => {
      setAllComments(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return () => unscrible();
  }, []);

  const handleComment = (text) => {
    setComment(text);
  };

  if (!fontsLoaded) {
    return null;
  }
  const submitForm = () => {
    if (comment === "") {
      Alert.alert(" add your comment first");
      return;
    }
    addComment({ id, comment, userName, photoUrl });
    console.log(comment);
    resetForm();
  };

  const resetForm = () => {
    setComment("");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: urlPhoto }} />
        </View>
        <SafeAreaView style={styles.containerList}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allComments}
            renderItem={({ item }) => (
              <View style={styles.containerComment}>
                <View style={styles.avatarWrapper}>
                  <Image
                    style={styles.avatar}
                    source={{ uri: item.photoUrl }}
                  />
                </View>
                <View style={styles.commentWrapper}>
                  <Text style={styles.commnetText}>{item.comment}</Text>
                  <View>
                    <Text style={styles.timeText}>{item.date}</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={() => nanoid(5)}
          />
        </SafeAreaView>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Комментировать..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={handleComment}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TouchableOpacity style={styles.btnSubmit} onPress={submitForm}>
            <Feather name="arrow-up" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;
