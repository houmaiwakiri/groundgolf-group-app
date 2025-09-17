// App.tsx
// 環境変数 NODE_ENV によってルーティング方式を切り替える
// development → Expo Router
// production  → React Navigation

import { registerRootComponent } from "expo";

// 環境変数の取得（Docker Compose や CI/CD で NODE_ENV を指定）
const isDev = process.env.NODE_ENV === "development";

let App: React.ComponentType;

// 開発時: expo-router を使用
if (isDev) {
  // expo-router が app/ 配下を自動スキャン
  const { ExpoRoot } = require("expo-router");
  App = () => <ExpoRoot />;
} else {
  // 本番時: React Navigation を使用
  // src/App.tsx に NavigationContainer と TabNavigator を定義しておく
  App = require("./src/App").default;
}

// Expo 用のエントリポイントとして登録
export default registerRootComponent(App);
