# GroundGolf Group App - front

## 構成

* フロントエンド（アプリ版）: React Native (Expo, TypeScript)
* バックエンド: Java (Spring Boot REST API)
* データベース: MySQL
* インフラ: Docker Compose（開発） → AWS ECS / RDS / S3 + CloudFront（本番想定）

---

## ディレクトリ構成

```text
groundgolfgroupapp/
├─ front/          # React Native (Expo アプリ)
│   ├─ app/        # 画面（Expo Router が自動ルーティング）
│   │   ├─ _layout.tsx    # 下部タブメニュー
│   │   ├─ home.tsx      # ホーム
│   │   ├─ scores.tsx     # スコア登録
│   │   ├─ score-list.tsx # スコア一覧
│   │   ├─ team.tsx       # チーム
│   │   └─ other.tsx      # その他
│   ├─ components/        # 共通UIコンポーネント
│   ├─ lib/               # APIクライアント / 認証処理 / 設定
│   ├─ package.json
│   └─ App.tsx            # Expo Router エントリ
├─ back/            # Java (Spring Boot)
├─ docker-compose.yml
└─ README.md
```

---

## 開発環境構築手順

docker

* **Web (開発用ブラウザ確認)**

```bash
npm run web
```

→ [http://localhost:19006](http://localhost:19006) で確認可能

* **実機 (Expo Go アプリ使用)**
  スマホに Expo Go をインストールし、ターミナルに表示される QR コードを読み取る

* **Android Emulator / iOS Simulator**
  Android Studio / Xcode 環境があれば PC 上で起動可能

---

## 運用/デプロイ

* 開発: Expo CLI / Expo Go
* 本番: [Expo EAS Build](https://docs.expo.dev/build/introduction/) を利用

  * iOS → App Store 配信
  * Android → Google Play 配信

---

## 補足

* 下記コマンドで出力されるQRコードをスマホで読み込み、Expo Goアプリで動作確認

```bash
npx expo start --tunnel
```

* 共通ロジックは `lib/` にまとめる
* UI は `components/` に配置
* Expo Web はあくまで開発補助用
* `_layout.tsx` で下部タブメニューを管理
