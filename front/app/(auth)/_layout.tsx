import { Stack } from "expo-router";

// expo-routerが呼べるよう、default export
export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* index.tsxが無いため、login.tsxがデフォルト画面になる。 */}
            <Stack.Screen name="login" options={{ title: "ログイン" }} />
            <Stack.Screen name="callback" options={{ title: "認証中…" }} />
        </Stack>
    );
}