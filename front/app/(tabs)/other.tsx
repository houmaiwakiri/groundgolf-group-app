import React from "react";
import { Button, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../../src/libs/auth";

export default function OtherScreen() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            {/* ログアウトボタン */}
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>ログアウト</Text>
                </TouchableOpacity>
            </View>

            {/* 項目リスト */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemText}>項目 {index + 1}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    logoutContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    logoutButton: {
        backgroundColor: "#ef4444",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    logoutText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    scrollContent: {
        padding: 16,
    },
    item: {
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    itemText: {
        fontSize: 18,
        color: "#1f2937",
    },
});
