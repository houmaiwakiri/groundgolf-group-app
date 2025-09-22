# 認証

1. ユーザーが Hosted UI でログイン

2. Cognito がこの Expo プロキシ URL にリダイレクト

3. Expo サーバー（auth.expo.io）が、再度 カスタムスキーム front://callback に変換してアプリに戻す

4. アプリ側で AuthSession.openAuthSessionAsync がそのリダイレクトを受け取り、?code=xxx が取得できる
