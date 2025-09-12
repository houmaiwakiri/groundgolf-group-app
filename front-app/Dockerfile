# ベースイメージ
FROM node:22

# 作業ディレクトリ
WORKDIR /app

# package.json / package-lock.json をコピーして依存インストール
COPY package*.json ./
RUN npm install

# ソースコードコピー
COPY . .

# Expo CLI をグローバルインストール
RUN npm install -g expo-cli
RUN npm install -g @expo/ngrok

# 開発用コマンド（Webモードで起動）
# CMD ["npm", "run", "web"]
