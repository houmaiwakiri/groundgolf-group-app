import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";

import { exchangeCodeForToken } from "../../src/libs/token";
import { useAuth } from "../../src/libs/auth";
import LoadingIndicator from "../../src/components/LoadingIndicator";

type ExpoExtra = {
    cognitoClientId: string;
    cognitoDomain: string;
    cognitoRedirectUri: string;
};

export default function Callback() {
    const router = useRouter();
    const { code } = useLocalSearchParams<{ code?: string }>();
    const { login } = useAuth();
    const extra = Constants.expoConfig?.extra as ExpoExtra;

    useEffect(() => {
        if (code) {
            (async () => {
                try {
                    const tokens = await exchangeCodeForToken(code, extra);
                    await login(tokens);
                    router.replace("/(auth)/login");
                } catch (e) {
                    console.error("ログイン失敗:", e);
                }
            })();
        }
    }, [code]);

    return <LoadingIndicator />;
}
