import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../src/libs/auth";
import LoadingIndicator from "../src/components/LoadingIndicator";

function RootNavigator() {
    const { tokens, loading } = useAuth();
    const isAuthenticated = !!tokens;

    if (loading) {
        // ローディング中に表示する画面
        return <LoadingIndicator />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* 起動時に表示するトップ画面 */}
            <Stack.Screen name="top" />

            {/* 認証済みならタブ画面へ */}
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(tabs)" />
            </Stack.Protected>

            {/* 未認証ならログイン画面へ */}
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="(auth)" />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
