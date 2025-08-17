# GroundGolf Group App

## 構成

- フロントエンド: React (TypeScript)
- バックエンド: Java (Spring Boot)

---

## 環境構築手順

### 1. フロントエンド (Vite + React + TypeScript)

#### 必要条件

- Node.js (推奨: v18以上)
- npm

#### セットアップ

work/makeworld.batを実行するか、以下のコマンドでViteプロジェクトを作成してください。

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

- JDK 17以上
- Maven または Gradle

#### セットアップ

未記入

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

- まず `npx create-react-app groundgolf-group-app --template typescript` でプロジェクトディレクトリを作成してください。
- Java(Spring Boot)のプロジェクトも別ディレクトリで作成しておきます。

### 1. Docker & docker-compose インストール

- [Docker公式](https://docs.docker.com/get-docker/)からDocker Desktopをインストールしてください。

### 2. ディレクトリ構成例

```
groundgolf-group-app/
├─ frontend/   # React(TypeScript)プロジェクト
├─ backend/    # Java(Spring Boot)プロジェクト
├─ docker-compose.yml
└─ README.md
```

### 3. docker-compose.yml例

```yaml
version: '3'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    environment:
      - CHOKIDAR_USEPOLLING=true
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
```

### 4. React用Dockerfile例（frontend/Dockerfile）

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

### 5. Spring Boot用Dockerfile例（backend/Dockerfile）

```dockerfile
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 6. 起動方法

```bash
docker-compose up --build
```

---

## ディレクトリ構成例

```
groundgolf-group-app/
├─ src/
│  └─ App.tsx
├─ README.md
└─ ...その他ファイル
```

## 補足

- まずローカルでReact/Javaのプロジェクトを作成し、動作確認後にDocker化する流れが推奨です。
- `frontend`/`backend`ディレクトリにそれぞれのプロジェクトを配置してください。
- 詳細なDockerfileやdocker-composeのカスタマイズはプロジェクト構成に応じて調整してください。
