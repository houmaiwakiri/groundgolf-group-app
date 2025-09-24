// Rootレイアウト
// 認証状態によって(auth)と(tabs)を切り替える
import { Stack } from "expo-router";

import { AuthProvider } from "../src/libs/auth";
// 認証状態を管理するhook
// hookとは、状態管理や副作用を関数として切り出して再利用するためのもの
import { useAuth } from "../src/libs/auth";


export default function RootLayout() {

    const { isAuth } = useAuth();

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                {isAuth ? (
                    <Stack.Screen name="(tabs)" />
                ) : (
                    <Stack.Screen name="(auth)" />
                )}
            </Stack>
        </AuthProvider>
    );
}
