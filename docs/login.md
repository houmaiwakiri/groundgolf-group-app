# 認証・API 連携

* AWS Cognito Hosted UI を利用（認可コードフロー）
* Expo の `Linking` API で Hosted UI にリダイレクト
* コールバックを受け取り → トークン取得
* トークンは **SecureStore (iOS/Android)** または **localStorage/Web** に保持
* API 呼び出しは `lib/axiosClient.ts` を利用
* 