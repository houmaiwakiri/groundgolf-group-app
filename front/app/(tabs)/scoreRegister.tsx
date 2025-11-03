import React, { useState } from "react";
import {
    View, Text, TextInput, Button, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { postScores } from "../../src/libs/api";

export default function ScoreInput({ navigation }: any) {
    const router = useRouter();
    const [strokes, setStrokes] = useState(Array(8).fill(""));

    const handleChange = (index: number, value: string) => {
        const newStrokes = [...strokes];
        newStrokes[index] = value.replace(/[^0-9]/g, "");
        setStrokes(newStrokes);
    };

    const handleSubmit = async () => {
        const parsed = strokes.map((s) => parseInt(s, 10)).filter((n) => !isNaN(n));

        if (parsed.length !== 8) {
            Alert.alert("エラー", "8ホールすべてのスコアを入力してください。");
            return;
        }

        try {
            await postScores(parsed);
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
                <Text style={styles.title}>スコア入力（8ホール）</Text>

                <View style={styles.grid}>
                    {strokes.map((value, i) => (
                        <View key={i} style={styles.cell}>
                            <Text style={styles.label}>{i + 1}H</Text>
                            <TextInput
                                value={value}
                                onChangeText={(text) => handleChange(i, text)}
                                keyboardType="numeric"
                                style={styles.input}
                                maxLength={2}
                                placeholder="打数"
                            />
                        </View>
                    ))}
                </View>

                <Button title="登録" onPress={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#F9FAFB",
        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#1F2937",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    cell: {
        width: "48%",
        marginBottom: 12,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    label: {
        fontWeight: "600",
        marginBottom: 6,
        color: "#374151",
    },
    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 6,
        paddingVertical: 6,
        textAlign: "center",
        fontSize: 16,
    },
});
