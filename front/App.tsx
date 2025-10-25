// Expo Router のエントリーポイント
// 
// Expo Router は、React Native アプリのルーティングを
// "app/" ディレクトリ構造から自動生成する仕組みを持っています。
// そのため、この App.tsx は「起動のきっかけ」となるだけで、
// 実際の画面構成やナビゲーションは "app/_layout.tsx" 以下で定義される。

import { Slot } from "expo-router";

export default function App() {
    // Expo Router が現在のルートを <Slot /> に挿入して描画する。
    // 実際のナビゲーション構造は app/_layout.tsx に記述する。
    return <Slot />;
}
