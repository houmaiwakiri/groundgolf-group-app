import React, { useEffect } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/libs/auth';

type ExpoExtra = {
    // 必須
    cognitoClientId: string;
    cognitoDomain: string;
    // 任意
    cognitoScope?: string;
    cognitoResponseType?: string;
};

export default function LoginButton() {
    const extra = Constants.expoConfig?.extra as ExpoExtra;
    const scope = extra.cognitoScope?.split(' ') ?? ['openid', 'phone', 'profile', 'email'];
    const responseType = extra.cognitoResponseType ?? 'code';

    const router = useRouter();
    const { login } = useAuth();

    // リダイレクトURI
    const redirectUri = AuthSession.makeRedirectUri({ scheme: 'groundgolf-group-app' });

    // 認証リクエストを作成
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: extra.cognitoClientId,
            redirectUri,
            responseType,
            scopes: scope,
            usePKCE: false,
        },
        {
            authorizationEndpoint: `https://${extra.cognitoDomain}/oauth2/authorize/`,
            tokenEndpoint: `https://${extra.cognitoDomain}/oauth2/token/`,
        }
    );

    // 認証結果を監視してトークン取得・ログイン・タブ画面遷移
    useEffect(() => {
        // 成功時
        if (result?.type === 'success' && result.params?.code) {
            (async () => {
                try {
                    const code = result.params.code;

                    // トークン取得リクエスト
                    const body = new URLSearchParams({
                        grant_type: 'authorization_code',
                        client_id: extra.cognitoClientId,
                        code,
                        redirect_uri: redirectUri,
                    });

                    const tokenResponse = await fetch(`https://${extra.cognitoDomain}/oauth2/token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: body.toString(),
                    });

                    const tokens = await tokenResponse.json();

                    // AuthProvider にトークン保存
                    await login({
                        access_token: tokens.access_token,
                        id_token: tokens.id_token,
                        refresh_token: tokens.refresh_token,
                    });

                    // 認証済みなら画面に遷移
                    router.replace('/(tabs)/other');
                } catch (err) {
                    console.error('Login failed:', err);
                }
            })();
        }
    }, [result]);

    return (
        <View style={styles.container}>
            <Button
                title="ログイン"
                disabled={!request}
                onPress={() => promptAsync({ useProxy: true })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
});
