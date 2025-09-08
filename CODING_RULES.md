# コーディングルール

## 共通ルール

---

## Java（Spring Boot）

### ディレクトリ構成(クリーンアーキテクチャ準拠)

src/  
├─ **application / ビジネスルール・具体的な処理**  
├─ **domain / 型定義**  
├─ **infrastructure / DB、外部 API との接続**  
├─ **presentation / ユーザーとのやり取り**  
├─ config / 共通設定
└─ AppApplication.java / エントリーポイント

### 命名規則

- クラス名: PascalCase (`UserController`, `CreateUserInteractor`)
- メソッド名: camelCase (`findById`, `createUser`)
- 定数: UPPER_SNAKE_CASE (`MAX_LENGTH`)
- パッケージ名: 小文字・ドメイン単位 (`com.example.user`)

### 実装ルール

- インデントは tab

---

## TypeScript（React + Vite）

### ディレクトリ構成

src/  
├─ **application / ビジネスルール・具体的な処理**  
├─ **domain / 型定義**  
├─ **infrastructure / 外部 API との接続**  
├─ **presentation / ユーザーとのやり取り**  
├─ config.ts / 共通設定  
├─ App.tsx / ルーティング  
└─ main.ts / エントリーポイント

### 命名規則

- コンポーネント名: PascalCase (`UserList.tsx`)
- 関数/変数名: camelCase (`fetchUsers`, `userList`)
- 型/インターフェース: PascalCase (`User`, `UserResponse`)
- ファイル名: kebab-case (`user-service.ts`, `use-auth.ts`)

### 実装ルール

- インデントは空白 2 つ

---

## テスト

未記入

---
