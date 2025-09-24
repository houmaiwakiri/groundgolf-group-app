import { View, Text, StyleSheet } from "react-native";

export default function Scores() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>スコア登録</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20 },
});
