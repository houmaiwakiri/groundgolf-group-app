# GroundGolf Group App

## 構成

- フロントエンド: React Native (Expo + TypeScript)
- バックエンド: Java (Spring Boot)
- データベース: MySQL
- コンテナ管理: Docker / docker-compose

---

## ディレクトリ構成

```text
groundgolfgroupapp/
├─ front/          # React Native (Expo アプリ)
│   ├─ app/        # 画面（Expo Router によるルーティング）
│   ├─ components/ # 共通 UI コンポーネント
│   ├─ lib/        # API クライアント / 認証処理 / 設定
│   ├─ package.json
│   └─ App.tsx
├─ back/           # Java(Spring Boot)
│   ├─ src/
│   │   ├─ main/java/com/example/groundgolf/
│   │   │   ├─ controller/   # REST API (Spring MVC)
│   │   │   ├─ service/      # ビジネスロジック
│   │   │   ├─ repository/   # DBアクセス (Spring Data JPA)
│   │   │   ├─ model/        # Entity / DTO
│   │   │   ├─ config/       # 設定（CORS, Securityなど）
│   │   │   └─ GroundGolfApplication.java
│   │   └─ resources/
│   │       ├─ application.yml
│   │       ├─ static/
│   │       └─ templates/
│   └─ pom.xml
├─ docker-compose.yml
├─ CODING_RULES.md
├─ README.md
```

---

## 開発環境構築手順

1. [Docker 公式](https://docs.docker.com/get-docker/) から Docker Desktop をインストールしてください。
2. [Java 21](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi) をインストール
3. バックエンドをコンパイルします。

```bash
cd back/
./mvnw clean package -DskipTests
```

---

## コンテナ起動方法

```bash
docker-compose up --build
```

### 接続方法

| サービス               | URL                                              |
| ------------------ | ------------------------------------------------ |
| front (Expo Web)   | [http://localhost:19006](http://localhost:19006) |
| back (Spring Boot) | [http://localhost:8080](http://localhost:8080)   |
| db (MySQL)         | localhost:3306                                   |

---

## Docker コマンド集

```bash
docker-compose up --build
docker ps -a
docker exec -it groundgolfgroupapp-front-1 bash
docker exec -it groundgolfgroupapp-back-1 bash
docker exec -it groundgolfgroupapp-db-1 bash
```

---

## 動作確認

### フロント (Expo Web)

[http://localhost:19006/](http://localhost:19006/)

### バックエンド API

[http://localhost:8080/scores](http://localhost:8080/scores)

レスポンスが返却されれば成功。

---

## TEST 実行（バックエンド API）

### データ登録

```bash
Invoke-RestMethod -Uri http://3.113.11.174:80/scores -Method Post -Body (@(3,4,5,2,3,4,3,4,2,3) | ConvertTo-Json -Compress) -ContentType "application/json"
```

### データ確認

```bash
Invoke-RestMethod -Uri http://3.113.11.174:80/scores -Method Get | ConvertTo-Json
```

---

## アーキテクチャ

### フロントエンド: React Native (Expo Router)

* `_layout.tsx` でタブメニュー管理
* `lib/` に API クライアント・認証処理
* `components/` に共通 UI

### バックエンド: Spring Boot (Java 21) + REST API

* Spring Data JPA で DB アクセスを抽象化
* **Controller → Service → Repository → DB** のシンプルなレイヤード構成

### データベース

* MySQL

---

## 運用 / デプロイ

| 環境 | 構成                                                                                          |
| -- | ------------------------------------------------------------------------------------------- |
| 開発 | Docker Compose（front / back / db）                                                           |
| 本番 | back → AWS ECS (Fargate)<br>front → Expo EAS Build → App Store / Google Play 配信<br>DB → RDS |

---

## 補足
