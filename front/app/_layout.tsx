import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../src/libs/auth";
import LoadingIndicator from "../src/components/LoadingIndicator";
import { Text, View } from "react-native";

function RootNavigator() {
    const { tokens, loading } = useAuth();

    const isAuthenticated = !!tokens;

    if (loading) {
        // トークン読込中はローディング表示
        return <LoadingIndicator />;
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen name="(tabs)" />
                </Stack.Protected>

                <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen name="(auth)" />
                </Stack.Protected>
            </Stack>
        </View >
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
    );
}
