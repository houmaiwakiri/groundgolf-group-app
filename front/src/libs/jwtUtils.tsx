/**
 * JWT から payload をデコードして sub を取得
 * @param token JWT (id_token)
 * @returns userId (sub)
 */
export function getUserIdFromToken(token: string): string | null {
    try {
        // JWT を "." で分割
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const payload = parts[1];

        // Base64 デコード
        const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));

        // JSON パース
        const payloadObj = JSON.parse(decodedPayload);

        return payloadObj.sub ?? null;
    } catch {
        return null;
    }
}
