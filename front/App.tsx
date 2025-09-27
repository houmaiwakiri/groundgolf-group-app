import { AuthProvider } from "./src/libs/auth";
import { Slot } from "expo-router";

export default function App() {
    return (
        <AuthProvider>
            <Slot /> {/* Expo Routerの画面を表示 */}
        </AuthProvider>
    );
}
