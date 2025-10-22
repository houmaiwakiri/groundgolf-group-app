import React from "react";
import { TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function TopScreen() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
    //   router.pushの場合、ブラウザバックができるため、replaceを使用して戻れないようにする
      onPress={() => router.replace("/(auth)/login")}
    >
      <ImageBackground
        source={require("../assets/images/background/top.png")}
        style={styles.background}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
});
