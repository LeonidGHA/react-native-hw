import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 78,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginBottom: 32,
    borderRadius: 16,
  },
  avatarBox: {
    backgroundColor: "#F6F6F6",
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",

    fontSize: 13,
    fontWeight: "700",
    lineHeight: 15,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    color: "rgba(33, 33, 33, 0.8)",

    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
  },
});

export default styles;
