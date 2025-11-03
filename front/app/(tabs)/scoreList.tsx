import React, { useEffect, useState, useCallback } from "react";
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
import { getScores, updateScore, deleteScore } from "../../src/libs/api";

export default function ScoreList() {
    const [scores, setScores] = useState<number[][]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchScores = useCallback(async () => {
        try {
            setError(null);
            const data = await getScores();
            setScores(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

    const handleDelete = (index: number) => {
        Alert.alert(
            "削除確認",
            `ラウンド ${index + 1} を削除しますか？`,
            [
                { text: "キャンセル", style: "cancel" },
                {
                    text: "削除",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // 仮でindexは+1で計算。
                            // APIからIDも返すようにする。
                            await deleteScore(index + 1);
                            fetchScores();
                        } catch (err: any) {
                            Alert.alert("エラー", err.message);
                        }
                    },
                },
            ]
        );
    };

    const handleEdit = (index: number, currentScores: number[]) => {
        Alert.prompt(
            "スコア編集",
            `現在のスコア: ${currentScores.join(", ")}`,
            [
                { text: "キャンセル", style: "cancel" },
                {
                    text: "更新",
                    onPress: async (text) => {
                        if (!text) return;
                        try {
                            const newScores = text
                                .split(",")
                                .map((s) => parseInt(s.trim(), 10))
                                .filter((n) => !isNaN(n));
                            await updateScore(index + 1, newScores);
                            fetchScores();
                        } catch (err: any) {
                            Alert.alert("エラー", err.message);
                        }
                    },
                },
            ],
            "plain-text",
            currentScores.join(", ")
        );
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
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            fetchScores();
                        }}
                    />
                }
                renderItem={({ item, index }) => (
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreTitle}>ラウンド {index + 1}</Text>
                        <Text style={styles.scoreDetail}>{item.join(", ")}</Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => handleEdit(index, item)}
                            >
                                <Text style={styles.buttonText}>編集</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(index)}
                            >
                                <Text style={styles.buttonText}>削除</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
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
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1F2937",
    },
    refreshButton: {
        backgroundColor: "#10B981",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    refreshText: {
        color: "white",
        fontWeight: "600",
    },
    scoreCard: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    scoreTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
    },
    scoreDetail: {
        marginTop: 6,
        color: "#6B7280",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    editButton: {
        backgroundColor: "#3B82F6",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: "#EF4444",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    reloadButton: {
        marginTop: 10,
        backgroundColor: "#3B82F6",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    reloadText: {
        color: "white",
        fontWeight: "600",
    },
    errorText: {
        color: "#DC2626",
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        color: "#9CA3AF",
        marginTop: 20,
    },
});
