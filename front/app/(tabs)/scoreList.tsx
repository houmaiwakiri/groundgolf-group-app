import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";

export default function ScoreList() {
    const [scores, setScores] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const res = await fetch("http://192.168.10.101:8080/scores");
                if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
                const data = await res.json();
                setScores(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchScores();
    }, []);

    if (loading) return <ActivityIndicator style={styles.center} />;
    if (error) return <Text style={styles.center}>エラー: {error}</Text>;

    return (
        <FlatList
            data={scores}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
                <Text style={styles.item}>Hole {index + 1}: {item}</Text>
            )}
        />
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    item: { fontSize: 18, padding: 8, borderBottomWidth: 1, borderColor: "#ccc" },
});
