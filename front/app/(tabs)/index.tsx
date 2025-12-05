import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>グラウンドゴルフ仲間アプリ</Text>

            <View style={styles.noticeBox}>
                <Text style={styles.noticeTitle}>お知らせ</Text>
                <Text style={styles.noticeText}>現在、開発中のテストバージョンです。</Text>
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
                <Link href="/stats" asChild>
                    <TouchableOpacity style={styles.tile}>
                        <Text style={styles.tileText}>統計情報</Text>
                    </TouchableOpacity>
                </Link>
            </View>
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
        fontSize: 26,
        fontWeight: "bold",
        color: "#1f2937",
        textAlign: "center",
        marginBottom: 30,
    },
    noticeBox: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 18,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    noticeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2563eb",
        marginBottom: 8,
    },
    noticeText: {
        fontSize: 16,
        color: "#374151",
        lineHeight: 22,
    },
    tileContainer: {
        gap: 18,
    },
    tile: {
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    primaryTile: {
        backgroundColor: "#2563eb",
    },
    tileText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#111827",
    },
});
