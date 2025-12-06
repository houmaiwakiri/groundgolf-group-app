# 画像アップロード機能 仕様・構成書

## 1. 概要

ユーザーがプロフィール画像をアップロードできる機能を提供する。
アップロード処理はフロントから直接ストレージへ送信し、バックエンドは署名付き URL の発行とメタ情報管理のみを行う。

目的：

* バックエンドの負荷軽減
* 大容量ファイルの取り扱いを安全にする
* レスポンス高速化
* S3/MinIO に共通した設計

---

## 2. システム構成

```
[User App] -- requests URL --> [Backend API] -- generates --> [MinIO]
      \                                                 /
       \-------- PUT image directly via signed URL ----/
```

### フロントエンド（Expo / React Native）

* 画像選択（ImagePicker）
* バックエンドにアップロード用URLを要求
* 受け取った presigned URL に対して PUT で直接アップロード
* 最後に「アップロードしたファイル名」を API に送って DB に保存してもらう

### バックエンド（Spring Boot）

* MinIO client を使い presigned URL を発行
* ファイル名を生成し返却
* DB に画像パス(または object key) を保存
* 認証／認可で URL 諸々のアクセス制限を行う

### ストレージ（MinIO）

* バケットを 1 つ以上用意

  * 例: `user-profile-images`
* PUT の presigned URL をフロントへ発行
* GET（閲覧）用の presigned URL を必要に応じて API から返す

---

## 3. 仕様詳細

### 3.1 バケット構成

```
bucket: user-profile-images
object key: <userId>/<uuid>.jpg
```

例：
`user-profile-images/1234/7c22b8e0-93d7.jpg`

---

### 3.2 ファイル形式

* 画像のみ
* JPEG / PNG / WebP
* 最大 5MB（任意で調整）

---

### 3.3 API 仕様

#### 1) アップロード用 URL 発行 API

* **Method**: `POST /api/images/upload-url`
* **Auth**: 必須（JWT）
* **Request**

  ```json
  { "contentType": "image/jpeg" }
  ```
* **Response**

  ```json
  {
    "uploadUrl": "https://minio.local/...signed...",
    "objectKey": "1234/abc-123.jpg"
  }
  ```

#### 2) 保存用 API（DB にファイル名を保存）

* **Method**: `POST /api/users/profile-image`
* **Auth**: 必須
* **Request**

  ```json
  { "objectKey": "1234/abc-123.jpg" }
  ```

#### 3) 表示用 URL 発行 API（必要な場合のみ）

* **Method**: `GET /api/images/view-url?objectKey=xxx`
* **Response**:

  ```json
  { "url": "https://minio.local/...signed..." }
  ```

---

## 4. フロント処理フロー（React Native）

1. ImagePicker で画像取得
2. バックエンドから presigned URL 取得
3. その URL に `PUT` で画像をアップロード
4. objectKey をバックエンドへ送信してデータベースに保存
5. 表示する時は objectKey からの URL を API で取得

---

## 5. バックエンド（Spring Boot）内部処理

### 1) Presigned URL（PUT）発行

```java
String url = minioClient.getPresignedObjectUrl(
    GetPresignedObjectUrlArgs.builder()
        .method(Method.PUT)
        .bucket("user-profile-images")
        .object(objectKey)
        .expiry(60)  // 60秒有効
        .build()
);
```

### 2) DB へ objectKey を保存

`UPDATE users SET avatar_key = :objectKey WHERE id = :userId`

### 3) GET 用の presigned URL（閲覧）

必要な場合のみ発行する。

---

## 6. セキュリティ仕様

* presigned URL の有効期限は短め（60秒〜5分）
* バケットは非公開
* objectKey はユーザー ID で名前空間分け
* フロントに渡すのは URL と objectKey のみ
* 署名付き URL は外部SNS等に貼られても短時間で失効する

---

## 7. 今後追加できる機能

* 画像圧縮（フロント or バック）
* サイズバリデーション
* サムネイル生成（Lambda 風な Worker 追加）
* CloudFront や CDN の前段配置
* 複数画像アップロード
* GIF/動画対応

---
