import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";

type ScoreStats = {
    averageScore: number;
    maxScore: number;
    minScore: number;
    holeAverages: number[];
    totalRounds: number;
};

export default function StatsScreen() {
    const [stats, setStats] = useState<ScoreStats | null>(null);
    const [loading, setLoading] = useState(true);

    const loadStats = async () => {
        setLoading(true);
        try {
            const userId = await SecureStore.getItemAsync("user_id");
            if (!userId) {
                setLoading(false);
                return;
            }

            const res = await fetch(
                `http://localhost:8080/scores/stats?userId=${userId}`
            );

            const json = await res.json();
            setStats(json);
        } catch (e) {
            console.log("stats error", e);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadStats();
    }, []);

    if (loading) return <ActivityIndicator size="large" />;

    if (!stats)
        return <Text>統計データがありません</Text>;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>スコア統計</Text>

            <Text style={styles.item}>総ラウンド数: {stats.totalRounds}</Text>
            <Text style={styles.item}>平均スコア: {stats.averageScore.toFixed(2)}</Text>
            <Text style={styles.item}>最高スコア: {stats.maxScore}</Text>
            <Text style={styles.item}>最低スコア: {stats.minScore}</Text>

            <Text style={styles.subtitle}>ホールごとの平均</Text>
            {stats.holeAverages.map((v, i) => (
                <Text key={i} style={styles.item}>
                    {i + 1}H: {v.toFixed(2)}
                </Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
    item: { fontSize: 16, marginVertical: 4 },
});
