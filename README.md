# GroundGolf Group App

## 構成

- フロントエンド: Vite + React (TypeScript)
- バックエンド: Java (Spring Boot)
- データベース: MySQL
- コンテナ管理: Docker / docker-compose

---

## ディレクトリ構成

```
groundgolf-group-app/
├─ front/      # Vite + React(TypeScript)プロジェクト
├─ back/       # Java(Spring Boot)プロジェクト
├─ docker-compose.yml
├─ README.md
```

## 開発環境構築手順

1. [Docker 公式](https://docs.docker.com/get-docker/)から Docker Desktop をインストールしてください。

2. [Java21](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.msi) をインストール

3. jar 作成

```bash
cd back/
./mvnw clean package -DskipTests
```

## Docker 環境の起動方法

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
docker exec -it groundgolf-group-app-front-1 bash
docker exec -it groundgolf-group-app-back-1 bash
docker exec -it groundgolf-group-app-db-1 bash
```

## 動作確認

- React: [http://localhost:5173/](http://localhost:5173/)
- Java API: [http://localhost:8080/api/hello](http://localhost:8080/)

それぞれレスポンスが返却されれば成功

---

## 補足
