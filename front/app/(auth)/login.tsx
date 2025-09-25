import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

// 型定義
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
    const scope = extra.cognitoScope?.split(' ') ?? ['openid', 'profile', 'email'];
    const responseType = extra.cognitoResponseType ?? 'code';

    const [message, setMessage] = useState<string>('');

    // リダイレクトURI（Expo Go / 本番両対応）
    const redirectUri = AuthSession.makeRedirectUri({ scheme: 'front' });

    // 認証リクエストを作成
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: extra.cognitoClientId,
            redirectUri,
            responseType: responseType,
            scopes: scope,
            extraParams: { identity_provider: '' },
        },
        {
            authorizationEndpoint: `https://${extra.cognitoDomain}/login`,
            tokenEndpoint: `https://${extra.cognitoDomain}/oauth2/token`,
        }
    );

    // 認証結果を監視
    useEffect(() => {
        if (result) {
            if (result.type === 'success' && result.params?.code) {
                setMessage(`Auth code: ${result.params.code}`);
            } else if (result.type === 'dismiss') {
                setMessage('Login dismissed');
            } else {
                setMessage(`Login failed: ${JSON.stringify(result)}`);
            }
        }
    }, [result]);

    return (
        <View style={styles.container}>
            <Button
                title="Login with Cognito"
                disabled={!request}
                onPress={() => {
                    promptAsync({ useProxy: true }).catch((err) =>
                        setMessage(`Error: ${err.message}`)
                    );
                }}
            />
            {message !== '' && <Text style={styles.message}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    message: { marginTop: 20, color: 'red' },
});
