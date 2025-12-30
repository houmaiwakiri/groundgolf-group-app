import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useAuth } from "../../src/libs/auth";
import { getScoreStats } from "../../src/libs/api";

type ScoreStats = {
    average: number;
    max: number;
    min: number;
    holeAverages: number[];
    rounds: number;
};

export default function StatsScreen() {
    const { userId } = useAuth();
    const [stats, setStats] = useState<ScoreStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadStats = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const data: ScoreStats = await getScoreStats(String(userId));
            setStats(data);
        } catch (e) {
            console.log("stats error", e);
        }
        setLoading(false);
    };
    console.log(stats);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadStats();
        setRefreshing(false);
    };

    useEffect(() => {
        loadStats();
    }, []);

    // ローディング中
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // statsが取得できない場合の画面出力
    if (!stats) {
        return (
            <View style={styles.center}>
                <Text>統計データがありません</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Text style={styles.title}>スコア統計</Text>

            {/* 基本統計カード */}
            <View style={styles.card}>
                <Text style={styles.item}>総ラウンド数: {stats.rounds}</Text>
                <Text style={styles.item}>
                    平均スコア: {stats.average.toFixed(2)}
                </Text>
                <Text style={styles.item}>最高スコア: {stats.max}</Text>
                <Text style={styles.item}>最低スコア: {stats.min}</Text>
            </View>

            {/* ホールごとの平均 */}
            <Text style={styles.subtitle}>ホールごとの平均</Text>

            <View style={styles.grid}>
                {stats.holeAverages.map((v, i) => (
                    <View key={i} style={styles.cell}>
                        <Text style={styles.label}>{i + 1}H</Text>
                        <Text style={styles.holeValue}>{v.toFixed(2)}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F9FAFB",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#111827",
        textAlign: "center",
    },
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 20,
    },
    item: {
        fontSize: 16,
        marginVertical: 4,
        color: "#374151",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        marginTop: 10,
        color: "#111827",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cell: {
        width: "30%",
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 14,
        marginBottom: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "600",
        marginBottom: 4,
    },
    holeValue: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#111827",
    },
});
