# GroundGolf Group App

## 構成

- フロントエンド: Vite + React (TypeScript)
- バックエンド: Java (Spring Boot)
- データベース: MySQL
- コンテナ管理: Docker / docker-compose

---

## 環境構築手順

### 1. フロントエンド (Vite + React + TypeScript)

#### 必要条件

- Node.js (推奨: v18以上)
- npm

#### セットアップ

work/makeworld.bat または work/makeworld.sh を実行するか、以下のコマンドでViteプロジェクトを作成してください。

```bash
# Vite + React + TypeScript プロジェクト作成
npm create vite@latest front -- --template react-ts

# ディレクトリ移動
cd front

# 依存パッケージインストール
npm install
npm install axios
```

#### 開発サーバー起動

```bash
npm run dev
```

---

### 2. バックエンド (Java Spring Boot)

#### 必要条件

- JDK 21以上
- Maven

#### セットアップ

1. [Spring Initializr](https://start.spring.io/)でプロジェクト作成  
   - Dependencies: Spring Web, Spring Data JPA, MySQL Driver

2. DB接続設定例（`application.properties`）

```
spring.datasource.url=jdbc:mysql://db:3306/appdb
spring.datasource.username=appuser
spring.datasource.password=apppass
spring.jpa.hibernate.ddl-auto=update
```

#### サーバー起動

```bash
./mvnw spring-boot:run
```
または
```bash
./gradlew bootRun
```

---

### 3. 動作確認

- React: [http://localhost:5173/](http://localhost:5173/)
- Java API: [http://localhost:8080/api/hello](http://localhost:8080/api/hello)

React画面にAPIのメッセージが表示されれば成功です。

---

## Dockerによる環境構築

### 前提

- `front` ディレクトリにVite + React + TypeScriptプロジェクトを作成
- `back` ディレクトリにSpring Bootプロジェクトを作成し、`target/app.jar` をビルドして配置

### 1. Docker & docker-compose インストール

- [Docker公式](https://docs.docker.com/get-docker/)からDocker Desktopをインストールしてください。

### 2. ディレクトリ構成例

```
groundgolf-group-app/
├─ front/      # Vite + React(TypeScript)プロジェクト
├─ back/       # Java(Spring Boot)プロジェクト
├─ docker-compose.yml
├─ README.md
└─ work/　　　　#環境構築用
    ├─ makeworld.bat
    └─ makeworld.sh
```

### 3. Docker環境の起動方法

```bash
docker-compose up --build
```

- 接続方法
- front: http://localhost:5173  
- back: http://localhost:8080  
- db: MySQL (localhost:3306)

---

### 4. Dockerコマンド集

```bash
docker-compose up --build
docker ps -a
docker exec -it groundgolf-group-app-front-1 bash
docker exec -it groundgolf-group-app-back-1 bash
docker exec -it groundgolf-group-app-db-1 bash
```

## 補足

- ローカルでReact/Javaのプロジェクトを作成し、動作確認後にDocker化する流れが推奨です。
- `front`/`back` ディレクトリにそれぞれのプロジェクトを配置してください。
- DB接続情報やDockerfileはプロジェクト構成に応じて調整してください。
- Windowsは `work/makeworld.bat`、Linux/Macは `work/makeworld.sh` で初期セットアップ可能です。
