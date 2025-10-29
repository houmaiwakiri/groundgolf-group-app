/**
 * fetchにタイムアウト機能とリトライ機能を追加した関数。
 * @param url リクエスト先の URL
 * @param options fetch のオプション(method,headers,bodyなど)
 * @param timeout タイムアウト時間(ミリ秒)
 * @param retries リトライ回数。デフォルトは2回
 * @returns Promise<Response> - 成功した場合は fetch の Response、失敗した場合は reject
 */
export async function fetchTimeout(
    url: string,
    options: RequestInit = {},
    timeout: number = 5000,
    retries: number = 2
): Promise<Response> {
    // 内部関数で再帰的にリトライ処理
    const attempt = async (remainingRetries: number): Promise<Response> => {
        try {
            // Promise.raceでタイムアウトとfetchを競争させる
            return await Promise.race([
                fetch(url, options),
                new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error("タイムアウトしました")), timeout)
                ),
            ]);
        } catch (err) {
            if (remainingRetries > 0) {
                // 残りリトライがある場合は再試行
                return attempt(remainingRetries - 1);
            } else {
                throw err;
            }
        }
    };
    return attempt(retries);
}
