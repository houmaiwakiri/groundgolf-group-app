import React, { useState } from "react";
import {
    View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { updateScore } from "../src/libs/api";
import { useAuth } from "../src/libs/auth";

export default function ScoreEdit() {
    const router = useRouter();
    const { id, strokes } = useLocalSearchParams<{ id: string; strokes: string }>();
    const initialScores = JSON.parse(strokes || "[]") as number[];

    const [scores, setScores] = useState<number[]>(initialScores);
    const { userId } = useAuth();

    const handleChange = (index: number, value: string) => {
        const newScores = [...scores];
        const num = parseInt(value, 10);
        newScores[index] = isNaN(num) ? 0 : num;
        setScores(newScores);
    };

    const handleSubmit = async () => {
        try {
            await updateScore(String(userId), Number(id), scores);
            Alert.alert("更新完了", "スコアを更新しました。", [
                { text: "OK", onPress: () => router.back() },
            ]);
        } catch (err: any) {
            Alert.alert("エラー", err.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>スコア編集</Text>

                <View style={styles.grid}>
                    {scores.map((value, i) => (
                        <View key={i} style={styles.cell}>
                            <Text style={styles.label}>{i + 1}H</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={value.toString()}
                                maxLength={2}
                                onChangeText={(text) => handleChange(i, text)}
                                returnKeyType="done"
                            />
                        </View>
                    ))}
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancel]}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.buttonText}>キャンセル</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.save]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>保存</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#F9FAFB",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#111827",
        textAlign: "center",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cell: {
        width: "47%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    label: {
        textAlign: "center",
        fontWeight: "600",
        color: "#374151",
    },
    input: {
        marginTop: 6,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 6,
        textAlign: "center",
        fontSize: 18,
        paddingVertical: 4,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    cancel: {
        backgroundColor: "#9CA3AF",
    },
    save: {
        backgroundColor: "#3B82F6",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
