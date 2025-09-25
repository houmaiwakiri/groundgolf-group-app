// Rootレイアウト
// 認証状態によって(auth)と(tabs)を切り替える
import { Stack } from "expo-router";

import { AuthProvider } from "../src/libs/auth";
// 認証状態を管理するhook
// hookとは、状態管理や副作用を関数として切り出して再利用するためのもの
import { useAuth } from "../src/libs/auth";

// 通常の関数定義
function RootNavigator() {
    const { isAuthenticated } = useAuth();

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                // 認証済の場合
                <Stack.Screen name="(tabs)" />
            ) : (
                // 未認証の場合
                <Stack.Screen name="(auth)/login" />
            )}
        </Stack>
    );
}

// 外部で使用できる
export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
