# GroundGolf Group App - front-app

## 構成

- フロントエンド（アプリ版）: React Native (Expo, TypeScript)
- バックエンド: Java (Spring Boot REST API)
- データベース: MySQL
- インフラ: Docker Compose（開発） → AWS ECS / RDS / S3 + CloudFront（本番想定）

---

## ディレクトリ構成

```text
groundgolfgroupapp/
├─ front-web/       # Vite + React (ブラウザ)
├─ front-app/       # React Native (アプリ)
│   ├─ app/         # 画面（Expo Router用ルーティング）
│   ├─ src/
│   │   ├─ domain/         # 型定義 (Score, Token など)
│   │   ├─ application/    # ユースケース
│   │   ├─ infrastructure/ # API クライアント
│   │   └─ presentation/   # UI コンポーネント
│   ├─ package.json
│   └─ App.tsx
├─ back/            # Java (Spring Boot)
├─ docker-compose.yml
├─ README.md
```

---

## 開発環境構築手順

1. [Node.js (21)](https://nodejs.org/) をインストール

2. Expo CLI をインストール

```bash
npm install -g expo-cli
```

3. プロジェクト起動

```bash
cd front-app
npm install
npm run start
```

4. 起動方法

- **Web (開発用ブラウザ確認)**

  ```bash
  npm run web
  ```

  → [http://localhost:19006](http://localhost:19006) で確認可能

- **実機 (Expo Go アプリ使用)**
  スマホに Expo Go をインストールし、ターミナルに表示される QR コードを読み取る

- **Android Emulator / iOS Simulator**
  Android Studio / Xcode 環境があれば PC 上で起動可能

---

## 認証・API 連携

- AWS Cognito Hosted UI を利用（認可コードフロー）
- Expo の `Linking` API で Hosted UI にリダイレクト
- コールバックを受け取り → トークンを取得
- トークンは **SecureStore (iOS/Android)** または **localStorage/Web** に保持
- API 呼び出しは `src/infrastructure/api/axiosClient.ts` を利用

---

## 運用/デプロイ

- 開発: Expo CLI / Expo Go
- 本番: [Expo EAS Build](https://docs.expo.dev/build/introduction/) を利用し

  - iOS → App Store 配信
  - Android → Google Play 配信

---

## 補足

- 下記コマンドで出力されるQRコードをスマホで読み込み、expo goアプリで動作確認

```bash
npx expo start --tunnel
```

npx expo start --tunnel
- Web と App で共通化できるロジックは `domain` / `application` / `infrastructure` に配置
- ネイティブ機能を利用する場合は `SecureStore` などをインフラ層に実装
- Expo Web はあくまで開発補助用（本番ブラウザは front-web が担当）
