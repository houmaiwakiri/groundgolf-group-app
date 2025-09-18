import { View, Text, StyleSheet } from "react-native";

export default function Team() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>チーム</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20 },
});
