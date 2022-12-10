import { Button, TextInput, ToastAndroid, View } from "react-native";
import { colors } from "../../init";
import styles from "./styles";

const SearchBox = ({ navigation }) => {
  const search = ({ nativeEvent }) => {
    if (nativeEvent.text.trim() === "") {
      ToastAndroid.show(
        "Preencha o campo de pesquisa antes...",
        ToastAndroid.SHORT
      );
    } else {
      navigation.navigate("Procurar", { query: nativeEvent.text });
    }
  };
  return (
    <View style={styles.searchContainer}>
      <TextInput
        keyboardType="default"
        onSubmitEditing={search}
        placeholder="O que você deseja?"
        placeholderTextColor={colors.placeholder}
        style={styles.input}
      />
      <Button
        color={colors.loadingAndButtons}
        onPress={search}
        title="Procurar"
      />
    </View>
  );
};

export default SearchBox;
