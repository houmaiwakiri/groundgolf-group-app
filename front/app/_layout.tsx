import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../src/libs/auth";
import LoadingIndicator from "../src/components/LoadingIndicator";

// 画面構成
function RootNavigator() {
    const { tokens, loading } = useAuth();
    const isAuthenticated = !!tokens;

    if (loading) {
        // ローディング中に表示する画面
        return <LoadingIndicator />;
    }

    return (

        <Stack screenOptions={{ headerShown: false }}>
            {/* 起動画面 */}
            <Stack.Screen name="top" />

            {/* 認証済みルーター読み込み */}
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(tabs)" />
            </Stack.Protected>

            {/* 未認証用のルーター読み込み */}
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="(auth)" />
            </Stack.Protected>
        </Stack>
    );
}

// ルーティングの起点となるコンポーネント(PHPのindex.php的な役割)
export default function RootLayout() {
    return (
        // RootNavigator配下のコンポーネントでは、
        // AuthProviderが提供する認証状態を自由に参照できる。
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
