import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../src/libs/auth";

export default function OtherScreen() {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            {/* ログアウトボタン */}
            <View style={styles.logoutContainer}>
                <Button title="ログアウト" onPress={logout} />
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
    },
    logoutContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    scrollContent: {
        padding: 16,
    },
    item: {
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: "#f2f2f2",
    },
    itemText: {
        fontSize: 16,
    },
});
