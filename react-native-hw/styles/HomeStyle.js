import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  tabStyle: {
    flex: 0.07,
    alignItems: "center",
    paddingTop: 9,
    paddingHorizontal: 80,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: "-0.5" },
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
  headerBtnLogOut: {
    marginRight: 20,
  },
  headerBtnBack: {
    marginLeft: 20,
  },
});
export default styles;
