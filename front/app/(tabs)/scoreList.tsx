import React, { useEffect, useState, useCallback } from "react";
import Constants from "expo-constants";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    TouchableOpacity,
} from "react-native";

type ExpoExtra = {
    apiBaseUrl: string;
};

export default function ScoreList() {
    const extra = Constants.expoConfig?.extra as ExpoExtra;
    const [scores, setScores] = useState<number[][]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchScores = useCallback(async () => {
        try {
            setError(null);
            const res = await fetch(`${extra.apiBaseUrl}/scores`);
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            const data = await res.json();
            setScores(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [extra.apiBaseUrl]);

    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

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
            {/* ヘッダー */}
            <View style={styles.header}>
                <Text style={styles.title}>スコア一覧</Text>
                <TouchableOpacity onPress={fetchScores} style={styles.refreshButton}>
                    <Text style={styles.refreshText}>更新</Text>
                </TouchableOpacity>
            </View>

            {/* スコアリスト */}
            <FlatList
                data={scores}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => {
                        setRefreshing(true);
                        fetchScores();
                    }} />
                }
                renderItem={({ item, index }) => (
                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreTitle}>ラウンド {index + 1}</Text>
                        <Text style={styles.scoreDetail}>{item.join(", ")}</Text>
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
