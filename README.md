# GroundGolf Group App

## 構成

- フロントエンド: Vite + React (TypeScript)
- バックエンド: Java (Spring Boot)
- データベース: MySQL
- コンテナ管理: Docker / docker-compose

---

## ディレクトリ構成

```text
groundgolfgroupapp/
├─ front/      # Vite + React(TypeScript)プロジェクト
├─ back/       # Java(Spring Boot)プロジェクト
├─ docker-compose.yml
├─ README.md
```

## 開発環境構築手順

1. [Docker 公式](https://docs.docker.com/get-docker/)から Docker Desktop をインストールしてください。

2. [Java21](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi) をインストール

3. コンパイル

```bash
cd back/
./mvnw clean package -DskipTests
```

## コンテナ起動方法

```bash
docker-compose up --build
```

- 接続方法
- front: http://localhost:5173
- back: http://localhost:8080
- db: MySQL (localhost:3306)

---

### 4. Docker コマンド集

```bash
docker-compose up --build
docker ps -a
docker exec -it groundgolfgroupapp-front-1 bash
docker exec -it groundgolfgroupapp-back-1 bash
docker exec -it groundgolfgroupapp-db-1 bash
```

## 動作確認

- React: [http://localhost:5173/](http://localhost:5173/)
- Java API: [http://localhost:8080/api/hello](http://localhost:8080/)

それぞれレスポンスが返却されれば成功

---

## TEST 実行

- データ登録

```bash
Invoke-RestMethod -Uri http://localhost:8080/scores -Method Post -Body (@(3,4,5,2,3,4,3,4,2,3) | ConvertTo-Json -Compress) -ContentType "application/json"
```

- データ確認

```bash
Invoke-RestMethod -Uri http://localhost:8080/scores -Method Get | ConvertTo-Json
```

## AI と会話したいときに使って

・全体像
フロントエンド: Vite + React + TypeScript + React Router
バックエンド: Spring Boot (Java 21) + REST API
DB: MySQL
インフラ:
開発 → Docker Compose（front / back / db）
本番 → ECS (Fargate) / RDS(EC2) / S3 + CloudFront

・アーキテクチャ
クリーンアーキテクチャを意識した分離

- domain : エンティティ / 値オブジェクト / リポジトリ IF
- application : ユースケース / サービス層
- infrastructure : DB 実装 (Spring Data JPA) / 外部サービス連携
- presentation : REST Controller

Spring Boot + JPA で DB アクセスを抽象化
React は開発中 npm run dev、本番は S3 配信
REST API を Controller → UseCase → Repository → DB という流れで実行

・運用/デプロイ
GitHub リポジトリにフロントセット済み（front/）
今後 back/ に Spring Boot プロジェクト作成予定
Docker Compose で front / back / db をまとめて起動
デザインは Figma
本番デプロイ先は
back → ECS(Fargate)
front → S3 + CloudFront
DB → RDS(EC2)

## 補足
