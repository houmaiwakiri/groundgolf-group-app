@echo off
echo "プロジェクトを配置したいディレクトリに移動してから実行してください。"

REM git clone
git clone https://github.com/groundgolf-group-app/groundgolf-group-app.git

REM プロジェクトディレクトリへ移動
cd groundgolf-group-app

REM Vite + React + TypeScript フロントエンド環境作成
npm create vite@latest front -- --template react-ts

REM 必要なパッケージインストール
cd front
npm install
npm install axios

REM --- ここにJava(Spring Boot)やDockerのセットアップコマンドを追加できます ---
REM 例: Javaプロジェクト作成、Dockerイメージビルドなど

REM 完了メッセージ
echo "Vite + React + TypeScript 環境構築が完了しました。"