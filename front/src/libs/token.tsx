import * as SecureStore from "expo-secure-store";

type ExpoExtra = {
    cognitoClientId: string;
    cognitoDomain: string;
    cognitoRedirectUri: string;
};

export async function exchangeCodeForToken(code: string, extra: ExpoExtra) {
    const tokenUrl = `https://${extra.cognitoDomain}/oauth2/token`;

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: extra.cognitoClientId,
        code,
        redirect_uri: extra.cognitoRedirectUri,
    }).toString();

    const response = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if (!response.ok) {
        throw new Error(`トークン交換失敗: ${response.status}`);
    }

    return response.json() as Promise<{
        access_token: string;
        id_token: string;
        refresh_token?: string;
        expires_in: number;
        token_type: string;
    }>;
}
