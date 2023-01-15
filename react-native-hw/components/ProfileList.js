import React from "react";
import { nanoid } from "nanoid";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import styles from "../styles/ProfileListStyle";

import LocationSVG from "../shared/images/cardPublication/location.svg";
import CommentSVG from "../shared/images/cardPublication/comment.svg";
import LikeSVG from "../shared/images/cardPublication/like.svg";

const data = [
  {
    title: "Wood",
    comment: 8,
    like: 153,
    place: "Ukraine",
  },
  {
    title: "Закат на Черном море",
    comment: 8,
    like: 153,
    place: "Ukraine",
  },
  {
    title: "Старый домик в Венеции",
    comment: 8,
    like: 153,
    place: "Italy",
  },
  {
    title: "Bar",
    comment: 8,
    like: 153,
    place: "Turkey",
  },
  {
    title: "office",
    comment: 8,
    like: 153,
    place: "Italy",
  },
  {
    title: "road",
    comment: 0,
    like: 0,
    place: "Germany",
  },
];

const ProfileList = ({ navigation }) => {
  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.publicationBox}>
            <View style={styles.imageBox}>
              <Image style={styles.image}></Image>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.reportBox}>
              <TouchableOpacity
                style={styles.commentBtn}
                onPress={() => navigation.navigate("Комментарии")}
              >
                <CommentSVG
                  style={
                    item.comment > 0
                      ? { ...styles.commentImg, color: "#FF6C00" }
                      : { ...styles.commentImg, color: "#BDBDBD" }
                  }
                />
                <Text style={styles.textBtn}>{item.comment}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.likeBtn}>
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
                onPress={() => navigation.navigate("Карта")}
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

export default ProfileList;
