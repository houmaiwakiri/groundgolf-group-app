import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HomeScreen from "../src/presentation/screens/HomeScreen";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* メインコンテンツ */}
      <View style={styles.content}>
        <HomeScreen />
      </View>

      {/* 下部メニュー */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/scoreList")}
        >
          <Text>スコア登録</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/scoreRegister")}
        >
          <Text>スコア一覧</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/team")}
        >
          <Text>チーム</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/other")}
        >
          <Text>その他</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
});
