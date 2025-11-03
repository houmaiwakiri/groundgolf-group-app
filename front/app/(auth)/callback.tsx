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

// Cognito設定により、ログイン後に/(auth)/callback にリダイレクトされ発火
export default function Callback() {
    const router = useRouter();
    // 設定値取得
    const extra = Constants.expoConfig?.extra as ExpoExtra;
    // 現在のURLに含まれるcode(認可コード)のオブジェクトからcodeを取得
    const { code } = useLocalSearchParams<{ code?: string }>();
    // 状態変化に応じて再レンダリングをするためにuseAuth(Hook)を使用
    const { login } = useAuth();

    useEffect(() => {
        // codeが存在しない場合はログイン画面へリダイレクト
        if (!code) {
            router.replace("/(auth)/login");
            return;
        }

        // 非同期関数(async)
        // ログイン結果を待つ間に、LoadingIndicatorを表示するため
        const handleAuth = async () => {
            try {
                // 認可コードを使用し、トークンを発行する。
                const tokens = await exchangeCodeForToken(code, extra);
                // 取得したトークンでログイン処理を実行
                await login(tokens);
                router.replace("/(tabs)/scoreRegister");
            } catch (err) {
                console.error("ログイン失敗:", err);
            }
        };
        handleAuth();
    }, [code]);

    return <LoadingIndicator />;
}
