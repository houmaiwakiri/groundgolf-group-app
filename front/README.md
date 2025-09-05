# front(TypeScript)

## 構成

presentation ： ユーザー操作・画面表示（React コンポーネント）  
application ： ユースケース（画面が何をしたいかを表すロジック）  
infrastructure ： 外部とのやり取り（API クライアント等）  
domain ： 型定義・ドメインモデル（アプリ内で共通に使う型）

## 構成詳細(クリーンアーキテクチャ)

### presentation（UI）

- 画面レイアウト、入力フォーム、ボタン、表示状態（loading/error）を担当
- ユーザー操作を受けて **application のユースケース関数** を呼ぶ
- 生データの整形（必要最小限）やユーザー向けのエラーメッセージ表示はここで行う

---

### application（UseCase）

- 画面の「やりたいこと（ユースケース）」を実装する層
- 例: `registerScore(strokes: number[]): Promise<Score>` や `loadScores(): Promise<Score[]>`
- **infrastructure（API）に依存するが、直接 axios を使わず抽象インターフェースを通す（依存逆転）**
- 成功/失敗を **presentation に返す**（Promise/Result オブジェクト等）

---

### infrastructure（API クライアント）

- 実際に HTTP を叩く実装（axios インスタンスをここに持つ）
- API のエンポイントやシリアライズ（必要なら request/response の変換）を担当
- application に対しては「関数（インターフェース）」で提供する
  - 例: `postScores(strokes)` / `getScores()`

---

### domain（モデル／型）

- アプリ内で共通して使う型を定義する（TypeScript の `interface` / `type`）
- 例: `Score` 型、`Result<T>` のユーティリティ型など
- ビジネスルールがある場合はここで表現（小さな Value Object など）
