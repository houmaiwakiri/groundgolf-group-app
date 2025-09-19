# 認証

1. ログイン画面で「ログイン」ボタンを押す
→ Cognito Hosted UI（AWSのログインページ）へリダイレクト

2. ユーザーが認証すると callback URI にリダイレクトされる（<http://localhost:19006/callback）>

3. アプリで 認可コード を受け取る

4. 認可コードを使って トークン（access_token / id_token / refresh_token） を取得

5. トークンを SecureStore（iOS/Android） or localStorage（Web） に保存

6. API 呼び出し時に Authorization: Bearer <access_token> を付与
