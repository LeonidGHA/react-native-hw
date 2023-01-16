import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  imageContainer: { marginBottom: 48 },
  imageWrapper: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 8,
  },
  imageBtn: {
    position: "absolute",
    top: 90,
    left: "42%",
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
