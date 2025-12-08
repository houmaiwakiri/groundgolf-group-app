import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { useAuth } from "../../src/libs/auth";

export default function OtherScreen() {
    const { logout, userId } = useAuth();

    return (
        <View style={styles.container}>
            {/* ログアウト */}
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>ログアウト</Text>
                </TouchableOpacity>
            </View>

            {/* プロフィール */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileCard}>
                    <Image
                        style={styles.avatar}
                        source={{
                            // uri: userId?.avatarUrl || "https://placehold.co/200x200",
                        }}
                    />

                    <Text style={styles.profileName}>
                        {userId || "名前未設定"}
                    </Text>

                    <Text style={styles.profileEmail}>
                        {userId || "メールなし"}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>アカウント情報</Text>
                    <View style={styles.item}>
                        <Text style={styles.itemLabel}>ユーザーID</Text>
                        <Text style={styles.itemValue}>{userId || "-"}</Text>
                    </View>
                </View>
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
        backgroundColor: "#fff",
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

    profileCard: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
        backgroundColor: "#e5e7eb",
    },
    profileName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },
    profileEmail: {
        fontSize: 16,
        color: "#6b7280",
        marginTop: 4,
    },

    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        color: "#374151",
    },

    item: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    itemLabel: {
        fontSize: 14,
        color: "#6b7280",
        marginBottom: 4,
    },
    itemValue: {
        fontSize: 16,
        color: "#111827",
        fontWeight: "500",
    },
});
