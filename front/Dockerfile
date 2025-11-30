FROM node:22

WORKDIR /app

# package.json / package-lock.json をコピーして依存インストール
COPY package*.json ./
RUN npm install

# Expo CLI をグローバルインストール
RUN npm install -g expo-cli @expo/ngrok

# node_modules はコンテナ内専用にする
VOLUME ["/app/node_modules"]
