FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

# ソースコードコピー
COPY . .

# Expo CLI をグローバルインストール
RUN npm install -g expo-cli
RUN npm install -g @expo/ngrok
