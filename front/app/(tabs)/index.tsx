import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
    // 初期表示を軽く保つため、ホーム画面内で完結する固定のヒント集を用意する。
    const tips = [
        "打つ前に素振りをして、当日の芝の硬さを確認しましょう。",
        "ホールを狙う前に、転がるラインを先にイメージすると安定します。",
        "短い距離でも力を入れすぎない方が、方向性がぶれにくいです。",
        "風が強い日は、ボールの転がりが短くなることを意識しましょう。",
    ];
    const [currentTip, setCurrentTip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

    const refreshTip = useCallback(() => {
        // 直前と同じ内容が続くと体験が単調になるため、別の候補が出るまで選び直す。
        let nextTip = currentTip;
        while (nextTip === currentTip) {
            nextTip = tips[Math.floor(Math.random() * tips.length)];
        }
        setCurrentTip(nextTip);
    }, [currentTip, tips]);

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

            <View style={styles.tipBox}>
                <Text style={styles.tipTitle}>今日のワンポイント</Text>
                <Text style={styles.tipText}>{currentTip}</Text>
                <TouchableOpacity style={styles.tipButton} onPress={refreshTip}>
                    <Text style={styles.tipButtonText}>別のヒントを見る</Text>
                </TouchableOpacity>
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
    tipBox: {
        backgroundColor: "#fef3c7",
        borderRadius: 16,
        padding: 18,
        marginTop: 24,
        borderWidth: 1,
        borderColor: "#fcd34d",
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#b45309",
        marginBottom: 8,
    },
    tipText: {
        fontSize: 16,
        color: "#7c2d12",
        lineHeight: 22,
    },
    tipButton: {
        marginTop: 12,
        alignSelf: "flex-start",
        backgroundColor: "#f59e0b",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
    },
    tipButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff7ed",
    },
});
