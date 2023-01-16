import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    paddingBottom: 60,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  snapBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  snapBtnCircle: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
  },
  reverseBtn: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
