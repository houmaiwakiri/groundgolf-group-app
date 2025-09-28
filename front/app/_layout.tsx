
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../src/libs/auth";
import LoadingIndicator from "../src/components/LoadingIndicator";
import { Text, View } from "react-native";

function RootNavigator() {
    const { tokens, loading } = useAuth();

    const forceLogout = true; // 開発用
    const isAuthenticated = forceLogout ? false : !!tokens;

    if (loading) {
        // トークン読込中はローディング表示
        return <LoadingIndicator />;
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack>
                <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen name="(tabs)" />
                </Stack.Protected>

                <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen name="(auth)" />
                </Stack.Protected>
            </Stack>


            {/* デバッグ表示 */}
            <View
                style={{
                    position: "absolute",
                    top: "40%",
                    left: 0,
                    right: 0,
                    alignItems: "center",
                    padding: 16,
                }}
                pointerEvents="none"
            >
                <Text>isAuthenticated: {isAuthenticated ? "true" : "false"}</Text>
                <Text>{JSON.stringify(tokens, null, 2)}</Text>
            </View>
        </View>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
