# GitHub CI/CD（Secrets方式）

## ワークフローファイル配置

1. リポジトリのルートに `.github/workflows/` フォルダを作る
2. その中に workflow YAML を置く

例:

```
your-repo/
├─ back/                    ← Java の Dockerfile とコード
├─ .github/
│  └─ workflows/
│      └─ deploy.yml        ← GitHub Actions YAML
├─ pom.xml / build.gradle    ← Java ビルド用
```

---

## GitHub Secrets 設定

GitHub リポジトリの **Settings → Secrets and variables → Actions → New repository secret** に登録。

| Secret 名              | 値例 / 説明                            |
| --------------------- | ---------------------------------- |
| AWS_ACCESS_KEY_ID     | IAM ユーザーのアクセスキーID                  |
| AWS_SECRET_ACCESS_KEY | IAM ユーザーのシークレットキー                  |
| AWS_REGION            | `ap-northeast-1` など                |
| AWS_ACCOUNT_ID        | AWS アカウントID                        |
| SUBNETS               | `subnet-aaa,subnet-bbb` のようにカンマ区切り |
| SECURITY_GROUPS       | `sg-xxx`（ECSタスク用）                  |
| DB_HOST               | EC2 のプライベートIP（DB構築後に設定）            |
| DB_PORT               | 3306                               |
| DB_USER               | DBユーザー名                            |
| DB_PASS               | DBパスワード                            |
| DB_NAME               | データベース名                            |

> DBはまだ構築していなくても、タスク定義にはダミー値や空で登録可能です。DB構築後に Secrets を更新して再デプロイします。

---

## GitHub リポジトリ側の準備

1. Dockerfile とソースコードを `back/` に置く
2. `.gitignore` にビルド成果物や IDE ファイルを追加

例:

```
target/
*.log
.idea/
*.iml
```

> Git にビルド済み jar入れない。

---

## push で自動デプロイ

1. `git add .`
2. `git commit -m "メモ"`
3. `git push origin main`

すると GitHub Actions が自動で実行されます：

1. Docker build → ECR push
2. IAM ロール作成（なければ）
3. ECS タスク定義登録
4. ECS サービス作成 or 更新

---
