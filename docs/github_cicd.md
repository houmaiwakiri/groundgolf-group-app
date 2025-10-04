# github CI/CD

## ワークフローファイル配置

1. リポジトリのルートに `.github/workflows/` フォルダを作る
2. その中にワークフローを置く

例:

```
your-repo/
├─ back/                    ← Java の Dockerfile とコード
├─ .github/
│  └─ workflows/
│      └─ deploy.yml        ← ここにさっき作った GitHub Actions YAML
├─ pom.xml / build.gradle    ← Java ビルド用
```

---

## GitHub Secrets 設定

GitHub リポジトリの Settings → **Secrets and variables → Actions** → **New repository secret**

下記を登録する：

| Secret 名              | 値                                  |
| --------------------- | ---------------------------------- |
| AWS_ACCESS_KEY_ID     | IAM ユーザーのアクセスキーID                  |
| AWS_SECRET_ACCESS_KEY | IAM ユーザーのシークレットキー                  |
| AWS_REGION            | `ap-northeast-1` など                |
| AWS_ACCOUNT_ID        | AWS アカウントID                        |
| SUBNETS               | `subnet-aaa,subnet-bbb` のようにカンマ区切り |
| SECURITY_GROUPS       | `sg-xxx`（ECSタスク用）                  |

> ここまでで GitHub Actions が AWS にアクセスできるようになる

---

## GitHub リポジトリ側の準備

1. Dockerfile とビルド成果物（jar）は `back/` に置く
2. `.gitignore` に `target/` を入れてビルド済み jar は push しない
   → GitHub Actions 側でビルドするのが推奨

例: `.gitignore`

```
target/
*.log
.idea/
*.iml
```

---

## git push するだけで動く流れ

1. ローカルでコード編集 → `git add .`
2. `git commit -m "feat: add backend"`
3. `git push origin main`

すると、GitHub Actions が自動で起動：

1. Docker build → ECR push
2. IAM ロール作成（なければ）
3. ECS タスク定義登録
4. ECS サービス作成 or 更新

---

## Optional: GitHub CLI で Secrets 設定する場合

ローカルから一括で登録したい場合は GitHub CLI (`gh`) を使える：

```bash
gh secret set AWS_ACCESS_KEY_ID --body "<アクセスキーID>"
gh secret set AWS_SECRET_ACCESS_KEY --body "<シークレットキー>"
gh secret set AWS_REGION --body "ap-northeast-1"
gh secret set AWS_ACCOUNT_ID --body "<アカウントID>"
gh secret set SUBNETS --body "subnet-aaa,subnet-bbb"
gh secret set SECURITY_GROUPS --body "sg-xxx"
```

> CLI で設定すれば GUI にいちいち入力する手間が省けます

---

💡 まとめると：

1. `.github/workflows/deploy.yml` に YAML を置く
2. 必要な **Secrets** を GitHub に登録
3. Dockerfile とソースコードを push
4. push すると自動で ECS にデプロイされる

---

希望なら次に **MySQL EC2 のパスワードや DB 情報も GitHub Secrets に入れて完全自動化** の手順もまとめられます。
やりますか？
