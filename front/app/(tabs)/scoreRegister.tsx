import React, { useState } from "react";
import Constants from "expo-constants";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";

type ExpoExtra = {
    apiBaseUrl: string;
};

export default function ScoreRegister() {
    const extra = Constants.expoConfig?.extra as ExpoExtra;
    const [scores, setScores] = useState(Array(8).fill(""));
    const [loading, setLoading] = useState(false);

    const handleChange = (text: string, index: number) => {
        const newScores = [...scores];
        newScores[index] = text.replace(/[^0-9]/g, "");
        setScores(newScores);
    };

    const handleRegister = async () => {
        if (scores.some((s) => s === "")) {
            Alert.alert("入力エラー", "すべてのホールにスコアを入力してください。");
            return;
        }

        const body = scores.map((s) => Number(s));
        // lodingにtrueをセットすることで、ローディング中のアイコンを表示する。
        setLoading(true);
        try {
            // bodyをスコアとして、json形式でAPIへ送信
            const res = await fetch(`${extra.apiBaseUrl}/scores`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            await res.json();
            Alert.alert("登録完了", "スコアを登録しました。");
            setScores(Array(8).fill(""));
        } catch (err: any) {
            Alert.alert("エラー", err.message);
        } finally {
            // lodingにfalseをセットして、ローディング中のアイコンを非表示にする。
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>スコア登録</Text>
                </View>

                <View style={styles.form}>
                    {scores.map((value, index) => (
                        <View key={index} style={styles.inputRow}>
                            <Text style={styles.label}>ホール {index + 1}</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="number-pad"
                                maxLength={2}
                                value={value}
                                onChangeText={(t) => handleChange(t, index)}
                                placeholder="0"
                                placeholderTextColor="#aaa"
                            />
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.button, loading && styles.disabledButton]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>登録する</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f9fafb",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 30,
        borderBottomWidth: 1,
        borderColor: "#e5e7eb",
        paddingBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#111827",
    },
    form: {
        marginBottom: 40,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
    },
    label: {
        fontSize: 20,
        fontWeight: "600",
        color: "#374151",
    },
    input: {
        backgroundColor: "#f3f4f6",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 20,
        width: 80,
        textAlign: "center",
        color: "#111827",
    },
    button: {
        backgroundColor: "#2563eb",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        shadowColor: "#2563eb",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },
    disabledButton: {
        opacity: 0.6,
    },
});
