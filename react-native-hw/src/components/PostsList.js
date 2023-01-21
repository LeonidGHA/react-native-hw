import React from "react";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import styles from "../styles/PostsListStyle";

import { addLike } from "../shared/requestFirebase/db/db";

import LocationSVG from "../shared/images/cardPublication/location.svg";
import CommentSVG from "../shared/images/cardPublication/comment.svg";
import LikeSVG from "../shared/images/cardPublication/like.svg";

const PostsList = ({ navigation, dataPosts }) => {
  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataPosts}
        renderItem={({ item }) => (
          <View style={styles.publicationBox}>
            <View style={styles.imageBox}>
              <Image
                style={styles.image}
                source={{
                  uri: item.photoUrl,
                }}
              ></Image>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.reportBox}>
              <TouchableOpacity
                style={styles.commentBtn}
                onPress={() =>
                  navigation.navigate("Комментарии", {
                    id: item.id,
                    uidUser: item.uid,
                    urlPhoto: item.photoUrl,
                    nickName: item.userName,
                  })
                }
              >
                <CommentSVG
                  style={
                    item.comments > 0
                      ? { ...styles.commentImg, color: "#FF6C00" }
                      : { ...styles.commentImg, color: "#BDBDBD" }
                  }
                />
                <Text style={styles.textBtn}>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.likeBtn}
                onPress={() => addLike({ id: item.id, like: item.like })}
              >
                <LikeSVG
                  style={
                    item.like > 0
                      ? { ...styles.likeImg, color: "#FF6C00" }
                      : { ...styles.likeImg, color: "#BDBDBD" }
                  }
                />
                <Text style={styles.textBtn}>{item.like}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.placeBtn}
                onPress={() => navigation.navigate("Карта", item.location)}
              >
                <LocationSVG style={styles.locationImg} />
                <Text>{item.place}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={() => nanoid(5)}
      />
    </SafeAreaView>
  );
};

export default PostsList;
