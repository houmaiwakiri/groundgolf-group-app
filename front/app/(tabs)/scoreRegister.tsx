import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { postScores } from "../../src/libs/api";
import { useAuth } from "../../src/libs/auth";

export default function ScoreInput() {
    const router = useRouter();
    const { userId } = useAuth();
    const [strokes, setStrokes] = useState(Array(8).fill(""));

    const handleChange = (index: number, value: string) => {
        const newStrokes = [...strokes];
        newStrokes[index] = value.replace(/[^0-9]/g, "");
        setStrokes(newStrokes);
    };

    const handleSubmit = async () => {
        if (!userId) {
            Alert.alert("エラー", "ユーザーIDが取得できません。再ログインしてください。");
            return;
        }

        const parsed = strokes.map((s) => parseInt(s, 10)).filter((n) => !isNaN(n));

        if (parsed.length !== 8) {
            Alert.alert("エラー", "8ホールすべてのスコアを入力してください。");
            return;
        }

        try {
            await postScores(userId, parsed);
            Alert.alert("登録完了", "スコアを登録しました。", [
                {
                    text: "OK",
                    onPress: () => router.push("/(tabs)/scoreList"),
                },
            ]);
        } catch (err: any) {
            Alert.alert("エラー", err.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>スコア入力</Text>
                <Text style={styles.subtitle}>8ホール分を入力</Text>

                <View style={styles.grid}>
                    {strokes.map((value, i) => (
                        <View key={i} style={styles.cell}>
                            <Text style={styles.label}>{i + 1}H</Text>
                            <TextInput
                                value={value}
                                onChangeText={(text) => handleChange(i, text)}
                                keyboardType="number-pad"
                                style={styles.input}
                                maxLength={2}
                                placeholder="0"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* 登録ボタンを下に固定 */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>登録</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#F9FAFB",
        flexGrow: 1,
        paddingBottom: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cell: {
        width: "48%",
        backgroundColor: "white",
        borderRadius: 14,
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginBottom: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: "700",
        color: "#374151",
        marginBottom: 6,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingVertical: 14,
        fontSize: 28,
        fontWeight: "800",
        textAlign: "center",
        color: "#1F2937",
        backgroundColor: "#F9FAFB",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    submitButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
    },
    submitText: {
        color: "white",
        fontSize: 18,
        fontWeight: "800",
    },
});
