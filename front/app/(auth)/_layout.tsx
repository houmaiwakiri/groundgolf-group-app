import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tabs.Screen
                name="login"
                options={{
                    title: "ログイン",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="push" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
