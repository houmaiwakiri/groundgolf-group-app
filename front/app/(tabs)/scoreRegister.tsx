import React from "react";
import Constants from 'expo-constants';
import { View, Button, StyleSheet, Text, Alert } from "react-native";

type ExpoExtra = {
    // 必須
    apiBaseUrl: string;
};

export default function ScoreRegister() {
    const extra = Constants.expoConfig?.extra as ExpoExtra;
    const handleRegister = async () => {
        // TESTデータ
        const body = [3, 4, 5, 2, 3, 4, 3, 4, 2, 3];

        try {
            const res = await fetch(`${extra.apiBaseUrl}/scores`, {
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
