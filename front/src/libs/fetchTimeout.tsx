/**
 * fetch に「タイムアウト」と「リトライ」を追加したユーティリティ関数。
 * - タイムアウトは Promise.race で擬似的に実現
 * - エラー時は指定回数だけ再試行する
 * @param url リクエスト先の URL
 * @param options fetch のオプション（method/headers/body など）
 * @param timeout タイムアウト時間（ミリ秒）
 * @param retries リトライ回数。デフォルトは 2 回
 * @returns 成功時は fetch の Response を返す Promise
 */
export async function fetchTimeout(
    url: string,
    options: RequestInit = {},
    timeout: number = 5000,
    retries: number = 2
): Promise<Response> {
    /**
     * 残りリトライ回数を受け取り、必要なら再帰的に呼び出す内部関数。
     * @param remainingRetries 残りのリトライ回数
     */
    const attempt = async (remainingRetries: number): Promise<Response> => {
        try {
            // Promise.race で「タイムアウト」と「fetch」を競争させる。
            return await Promise.race([
                fetch(url, options),
                new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error("タイムアウトしました")), timeout)
                ),
            ]);
        } catch (err) {
            if (remainingRetries > 0) {
                // 残りリトライがある場合は再試行する。
                return attempt(remainingRetries - 1);
            } else {
                throw err;
            }
        }
    };
    return attempt(retries);
}
