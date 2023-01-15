import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  publicationBox: {
    marginBottom: 35,
  },
  imageBox: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 8,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto-Medium",
    marginBottom: 11,
    color: "#212121",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 19,
  },
  reportBox: {
    flexDirection: "row",
  },
  commentBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentImg: { width: 24, height: 24, color: "#FF6C00" },
  textBtn: {
    fontFamily: "Roboto-Regular",
    marginLeft: 9,
    color: "#212121",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
  placeBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  textPlaceBtn: {
    fontFamily: "Roboto-Regular",
    marginLeft: 9,
    color: "#212121",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    textDecorationLine: "underline line-through",
  },
  locationImg: {
    width: 24,
    height: 24,
  },
});

export default styles;
