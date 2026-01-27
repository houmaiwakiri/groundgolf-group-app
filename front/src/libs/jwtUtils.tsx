/**
 * JWT から payload をデコードして、ユーザーID（sub）を取り出す関数。
 * @param token JWT（id_token）
 * @returns 取得できた場合は userId（sub）、失敗時は null
 */
export function getUserIdFromToken(token: string): string | null {
    try {
        // JWT を "." で分割
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const payload = parts[1];

        // Base64（URL セーフ）形式を通常の Base64 に戻してデコード
        const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));

        // JSON パース
        const payloadObj = JSON.parse(decodedPayload);

        return payloadObj.sub ?? null;
    } catch {
        // パース失敗時は null を返す
        return null;
    }
}
