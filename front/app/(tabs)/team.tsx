import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Team() {
    const teams = ["チームA", "チームB", "チームC"]; // 仮データ

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>チーム</Text>

            {teams.map((team, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardText}>{team}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    content: {
        padding: 24,
        paddingBottom: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 20,
        textAlign: "left",
    },
    card: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    cardText: {
        fontSize: 18,
        color: "#1f2937",
    },
});
