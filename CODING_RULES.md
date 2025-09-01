# コーディングルール

## 共通ルール

- 命名は英語を基本とする
- 役割が分かる名前をつける（略語は避ける）
- コメントは「なぜそうしたか」を書く（「何をしたか」は極力コードで表現）
- Linter / Formatter を必ず適用
  - Java: `spotless + google-java-format`
  - TypeScript: `ESLint + Prettier`

---

## Java（Spring Boot）

### ディレクトリ構成(クリーンアーキテクチャ準拠)

domain/ ← ビジネスルール  
 usecase/ ← ユースケース（サービス）  
 adapter/ ← Web/API, Repository 実装  
 infrastructure/← 設定や外部サービス接続

### 命名規則

- クラス名: PascalCase (`UserController`, `CreateUserInteractor`)
- メソッド名: camelCase (`findById`, `createUser`)
- 定数: UPPER_SNAKE_CASE (`MAX_LENGTH`)
- パッケージ名: 小文字・ドメイン単位 (`com.example.user`)

### 実装ルール

- Controller は REST API の入出力のみ担当
- UseCase はトランザクション境界 (`@Transactional`) を管理
- Repository は domain 層の IF を実装（Spring Data JPA）
- DTO を使って API I/O を明示（Entity を直接返さない）
- エラー処理は `@ControllerAdvice` で統一

---

## TypeScript（React + Vite）

### ディレクトリ構成(未定)

src/  
├─ components/ ← UI コンポーネント  
├─ pages/ ← ページ単位（React Router）  
├─ hooks/ ← カスタムフック  
├─ services/ ← API 通信（axios）  
├─ types/ ← 型定義  
└─ utils/ ← 共通処理

### 命名規則

- コンポーネント名: PascalCase (`UserList.tsx`)
- 関数/変数名: camelCase (`fetchUsers`, `userList`)
- 型/インターフェース: PascalCase (`User`, `UserResponse`)
- ファイル名: kebab-case (`user-service.ts`, `use-auth.ts`)

### 実装ルール

- 関数コンポーネント + Hooks を基本
- 状態管理は Hooks でシンプルに
- API 呼び出しは `services/` に集約
- props が多い場合は型を必ず定義
- CSS は Tailwind CSS を利用（Atomic デザイン意識）

---

## テスト

未記入

---
