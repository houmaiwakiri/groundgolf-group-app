import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/libs/auth";

type ExpoExtra = {
    cognitoClientId: string;
    cognitoDomain: string;
    cognitoScope?: string;
    cognitoResponseType?: string;
};

export default function LoginScreen() {
    const extra = Constants.expoConfig?.extra as ExpoExtra;
    const scope = extra.cognitoScope?.split(" ") ?? ["openid", "phone", "profile", "email"];
    const responseType = extra.cognitoResponseType ?? "code";

    const router = useRouter();
    const { login } = useAuth();

    // useStateは、Reactの状態管理フック。
    // [0]が状態変数、[1]がその変数を更新する関数。
    const [loading, setLoading] = useState(false);

    // リダイレクトURI
    // Cognitoに渡し、認証後にそのURIにリダイレクトしてアプリに戻す。
    const redirectUri = AuthSession.makeRedirectUri({ scheme: "groundgolf-group-app" });

    // useAuthRequestは、認証リクエストを作成し、認証フローを管理するためのフック
    // 下記3つの値を返す。
    // 1.request::OAuthリクエストの設定情報が入ったオブジェクト
    // 2.result::OAuth認証後に結果が入るオブジェクト
    // 3.promptAsync::ログイン画面を開く組み込み関数。
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: extra.cognitoClientId,
            redirectUri,
            responseType,
            scopes: scope,
            usePKCE: false,
        },
        {
            authorizationEndpoint: `https://${extra.cognitoDomain}/oauth2/authorize`,
            tokenEndpoint: `https://${extra.cognitoDomain}/oauth2/token`,
        }
    );

    // resultの値を監視し、if文で認証成功した場合にトークン交換を実行
    useEffect(() => {
        if (result?.type === "success" && result.params?.code) {
            (async () => {
                try {
                    setLoading(true);
                    const code = result.params.code;

                    const body = new URLSearchParams({
                        grant_type: "authorization_code",
                        client_id: extra.cognitoClientId,
                        code,
                        redirect_uri: redirectUri,
                    });

                    const tokenResponse = await fetch(`https://${extra.cognitoDomain}/oauth2/token`, {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: body.toString(),
                    });

                    const tokens = await tokenResponse.json();

                    if (!tokens.access_token) throw new Error("トークン取得に失敗しました");

                    // AuthProvider にトークン保存
                    await login({
                        access_token: tokens.access_token,
                        id_token: tokens.id_token,
                        refresh_token: tokens.refresh_token,
                    });

                    // 認証済みなら画面に遷移
                    router.replace("/(tabs)/scoreRegister");
                } catch (err) {
                    console.error("Login failed:", err);
                    alert("ログインに失敗しました。もう一度お試しください。");
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [result]);

    return (
        <ImageBackground
            source={require("../../assets/images/background/top.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>グラウンドゴルフ仲間アプリ</Text>
                <Text style={styles.subtitle}>スコア共有や仲間検索が簡単にできます</Text>

                <TouchableOpacity
                    style={[styles.button, (!request || loading) && styles.disabled]}
                    // ログイン押下によって発火
                    onPress={() => promptAsync()}
                    disabled={!request || loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <Text style={styles.buttonText}>ログインする ▶</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.note}>※ログインにはネット接続が必要です</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        paddingVertical: 50,
        paddingHorizontal: 30,
        borderRadius: 20,
        alignItems: "center",
        width: "85%",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#2e7d32",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 30,
        textAlign: "center",
    },
    note: {
        fontSize: 13,
        color: "#666",
        marginTop: 25,
    },
    button: {
        backgroundColor: "#43a047",
        paddingVertical: 18,
        paddingHorizontal: 60,
        borderRadius: 30,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    disabled: {
        backgroundColor: "#9e9e9e",
    },
});
