import { fetchTimeout } from "../../src/libs/fetchTimeout";

/**
 * Expo の extra に入れている Cognito 設定の型定義。
 */
type ExpoExtra = {
    cognitoClientId: string;
    cognitoDomain: string;
    cognitoRedirectUri: string;
};

/**
 * Cognito の認可コードをトークンに交換する関数。
 * @param code 認可コード（ログイン後に取得する一時的なコード）
 * @param extra Cognito の設定値（clientId / domain / redirectUri）
 * @returns Cognito が返すトークン情報
 */
export async function exchangeCodeForToken(code: string, extra: ExpoExtra) {
    const tokenUrl = `https://${extra.cognitoDomain}/oauth2/token`;

    // 組み込み関数URLSearchParamsで、
    // URLエンコード形式(name=abc&DEF=def)に変換してPOSTボディを作成
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: extra.cognitoClientId,
        code,
        redirect_uri: extra.cognitoRedirectUri,
    }).toString();

    // リクエスト & レスポンス（非同期処理）
    const response = await fetchTimeout(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    // fetchが返すResponseオブジェクトのokプロパティで成功判定
    // 200〜299 の範囲なら true、それ以外は false
    if (!response.ok) {
        throw new Error(`トークン交換失敗: ${response.status}`);
    }

    // 非同期処理は必ずPromiseを返す
    return response.json() as Promise<{
        access_token: string;
        id_token: string;
        refresh_token?: string;
        expires_in: number;
        token_type: string;
    }>;
}
