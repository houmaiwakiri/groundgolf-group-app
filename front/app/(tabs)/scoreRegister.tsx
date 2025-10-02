import React from "react";
import { View, Button, StyleSheet, Text, Alert } from "react-native";

export default function ScoreRegister() {
    const handleRegister = async () => {
        // TESTデータ
        const body = [3, 4, 5, 2, 3, 4, 3, 4, 2, 3];

        try {
            const res = await fetch("http://192.168.10.101:8080/scores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            const result = await res.json();
            Alert.alert("登録成功", JSON.stringify(result, null, 2));
        } catch (err: any) {
            Alert.alert("エラー", err.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>スコア登録</Text>
            <Button title="登録する" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 20, marginBottom: 20 },
});
