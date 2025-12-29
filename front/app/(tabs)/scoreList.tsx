import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { getScores, deleteScore } from "../../src/libs/api";
import { useAuth } from "../../src/libs/auth";

type Score = {
    id: number;
    strokes: number[];
};

export default function ScoreList() {
    const router = useRouter();
    const { userId } = useAuth();
    const [scores, setScores] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchScores = useCallback(async () => {
        if (!userId) return;
        try {
            setError(null);
            const data = await getScores(userId);
            setScores(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            fetchScores();
        }, [fetchScores])
    );

    const handleDelete = (scoreId: number) => {
        if (!userId) return;
        Alert.alert("削除確認", "このスコアを削除しますか？", [
            { text: "キャンセル", style: "cancel" },
            {
                text: "削除",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteScore(userId, scoreId);
                        fetchScores();
                    } catch (err: any) {
                        Alert.alert("エラー", err.message);
                    }
                },
            },
        ]);
    };

    const handleEdit = (score: Score) => {
        router.push({
            pathname: "/ScoreEdit",
            params: {
                id: score.id.toString(),
                strokes: JSON.stringify(score.strokes),
            },
        });
    };

    if (loading) return <ActivityIndicator style={styles.center} />;
    if (error)
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>エラー: {error}</Text>
                <TouchableOpacity style={styles.reloadButton} onPress={fetchScores}>
                    <Text style={styles.reloadText}>再読み込み</Text>
                </TouchableOpacity>
            </View>
        );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>スコア一覧</Text>
                <TouchableOpacity onPress={fetchScores} style={styles.refreshButton}>
                    <Text style={styles.refreshText}>更新</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={scores}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            fetchScores();
                        }}
                    />
                }
                renderItem={({ item, index }) => {
                    const total = item.strokes.reduce((a, b) => a + b, 0);

                    return (
                        <View style={styles.scoreCard}>
                            {/* 上段：ラウンド名＋合計スコア */}
                            <View style={styles.topRow}>
                                <Text style={styles.scoreTitle}>ラウンド {index + 1}</Text>
                                <Text style={styles.totalScore}>{total}</Text>
                            </View>

                            {/* 中段：各ホールスコア */}
                            <Text style={styles.scoreDetail}>{item.strokes.join(" / ")}</Text>

                            {/* 下段：操作ボタン */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => handleEdit(item)}
                                >
                                    <Text style={styles.buttonText}>編集</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDelete(item.id)}
                                >
                                    <Text style={styles.buttonText}>削除</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>スコアが登録されていません</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 14,
        paddingTop: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1F2937",
    },
    refreshButton: {
        backgroundColor: "#10B981",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    refreshText: {
        color: "white",
        fontWeight: "700",
        fontSize: 14,
    },
    scoreCard: {
        backgroundColor: "white",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 5,
        elevation: 3,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    scoreTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    totalScore: {
        fontSize: 28,
        fontWeight: "800",
        color: "#2563EB",
    },
    scoreDetail: {
        marginTop: 6,
        fontSize: 14,
        color: "#4B5563",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    editButton: {
        backgroundColor: "#3B82F6",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: "#EF4444",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 14,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    reloadButton: {
        marginTop: 12,
        backgroundColor: "#3B82F6",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
    },
    reloadText: {
        color: "white",
        fontWeight: "700",
        fontSize: 15,
    },
    errorText: {
        color: "#DC2626",
        fontSize: 16,
        fontWeight: "600",
    },
    emptyText: {
        textAlign: "center",
        color: "#9CA3AF",
        marginTop: 24,
        fontSize: 16,
    },
});
