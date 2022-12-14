import { StyleSheet } from "react-native";
import { colors } from "../../init";

const styles = StyleSheet.create({
  flex: { flex: 1 },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.texts.normal,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    color: colors.texts.normal,
  },
  sinopse: {
    margin: 4,
    color: colors.texts.sinopse,
  },
});

export default styles;
