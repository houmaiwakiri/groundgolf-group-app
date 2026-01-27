/**
 * 認証中など、処理待ちのときに表示するローディングインジケーター。
 * 画面中央にスピナーを表示します。
 */
import { View, ActivityIndicator } from "react-native";

export default function LoadingIndicator() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#007aff" />
        </View>
    );
}
