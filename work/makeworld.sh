#!/bin/bash
echo "プロジェクトを配置したいディレクトリに移動してから実行してください。"

# git clone
git clone https://github.com/groundgolf-group-app/groundgolf-group-app.git

# プロジェクトディレクトリへ移動
cd groundgolf-group-app

# Vite + React + TypeScript フロントエンド環境作成
npm create vite@latest front -- --template react-ts

# 必要なパッケージインストール
cd front
npm install
npm install axios

# --- ここにJava(Spring Boot)やDockerのセットアップコマンドを追加できます ---
# 例: Javaプロジェクト作成、Dockerイメージビルドなど

echo "Vite + React + TypeScript 環境構築が完了しました。"