// app/index.tsx
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.noticeBox}>
                <Text style={styles.noticeTitle}>お知らせ</Text>
                <Text style={styles.noticeText}>開発中です。</Text>
            </View>
            <View style={styles.tileContainer}>
                <Link href="/scoreRegister" asChild>
                    <TouchableOpacity style={styles.tile}>
                        <Text style={styles.tileText}>スコア登録</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/scoreList" asChild>
                    <TouchableOpacity style={styles.tile}>
                        <Text style={styles.tileText}>スコア一覧</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/team" asChild>
                    <TouchableOpacity style={styles.tile}>
                        <Text style={styles.tileText}>チーム</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f4f6",
        padding: 16,
    },
    noticeBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    noticeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 4,
    },
    noticeText: {
        color: "#374151",
    },
    tileContainer: {
        flexDirection: "column",
        gap: 16,
    },
    tile: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    tileText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
});
