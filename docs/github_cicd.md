# GitHub Actions Full Deploy to ECS ドキュメント

## 1. ワークフロー概要

- **ワークフロー名**: Full Deploy to ECS
- **トリガー**
  - main ブランチへの push
  - 手動トリガー（workflow_dispatch）
- **対象サービス**
  - AWS ECS (Fargate)
  - AWS ECR (Docker イメージ格納)
  - Maven / Java 21

---

## 2. 前提条件

- GitHub Secrets に以下を設定しておく必要があります

| Secret 名 | 内容 |
|------------|------|
| AWS_ACCESS_KEY_ID | デプロイ用 IAM ユーザーのアクセスキー |
| AWS_SECRET_ACCESS_KEY | デプロイ用 IAM ユーザーのシークレット |
| AWS_ACCOUNT_ID | AWS アカウント ID |
| AWS_REGION | デプロイ先リージョン |
| SUBNETS | ECS タスク用サブネット（例: `subnet-xxx,subnet-yyy`） |
| SECURITY_GROUPS | ECS タスク用セキュリティグループ（例: `sg-xxx`） |
| DB_HOST / DB_PORT / DB_NAME / DB_USER / DB_PASS | Spring Boot アプリ用 DB 接続情報 |

- GitHub Actions 用 IAM ユーザーに以下権限を付与
  - `ecs:*`
  - `ecr:*`
  - `iam:PassRole` (タスク実行ロール用)
  - `iam:CreateServiceLinkedRole` (初回 ECS サービス作成用)

- ECS タスク実行ロール（ecsTaskExecutionRole）が存在していること

---

## 3. ワークフロー構成

### 3-1. ソースコード取得

```yaml
- uses: actions/checkout@v3
```

* リポジトリを取得

---

### 3-2. Java セットアップ

```yaml
- uses: actions/setup-java@v3
  with:
    java-version: '21'
    distribution: 'temurin'
```

* Java 21 (Temurin) をセット

---

### 3-3. Maven ビルド

```yaml
- run: |
    cd back
    mvn clean package -DskipTests
    cd ..
```

* `back` ディレクトリで Spring Boot アプリをビルド
* テストはスキップ

---

### 3-4. ECS 名設定

```yaml
- run: |
    REPO_NAME=$(basename $GITHUB_REPOSITORY)
    echo "ECS_CLUSTER_NAME=${REPO_NAME}-cluster" >> $GITHUB_ENV
    echo "ECS_SERVICE_NAME=${REPO_NAME}-service" >> $GITHUB_ENV
    echo "ECS_TASK_FAMILY=${REPO_NAME}-task" >> $GITHUB_ENV
    echo "ECS_CONTAINER_NAME=${REPO_NAME}-container" >> $GITHUB_ENV
```

* リポジトリ名からクラスタ名・サービス名・タスク名・コンテナ名を自動生成
* `$GITHUB_ENV` に設定して以降のステップで利用

---

### 3-5. AWS 認証 & ECR ログイン

```yaml
- uses: aws-actions/configure-aws-credentials@v4
- uses: aws-actions/amazon-ecr-login@v2
```

* AWS CLI 認証
* Docker プッシュ用に ECR にログイン

---

### 3-6. Docker イメージビルド & プッシュ

```yaml
- run: |
    IMAGE_URI=${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/$REPO_NAME:${{ github.sha }}
    docker build -t $IMAGE_URI ./back
    docker push $IMAGE_URI
```

* Dockerfile は `back` に存在
* イメージタグに `github.sha` を利用し、コミットごとに固有のイメージを作成
* ECR にプッシュ

---

### 3-7. ECS タスク定義登録

```yaml
- run: |
    jq -n \
      --arg family "$ECS_TASK_FAMILY" \
      --arg container "$ECS_CONTAINER_NAME" \
      --arg image "$IMAGE_URI" \
      --arg url "jdbc:mysql://${{ secrets.DB_HOST }}:${{ secrets.DB_PORT }}/${{ secrets.DB_NAME }}" \
      --arg user "${{ secrets.DB_USER }}" \
      --arg pass "${{ secrets.DB_PASS }}" \
      '{ ... }' > task-def.json

    aws ecs register-task-definition --cli-input-json file://task-def.json
```

* CPU / メモリ / コンテナ定義 / 環境変数を含む JSON を作成
* `aws ecs register-task-definition` で登録

---

### 3-8. ECS クラスター作成（存在しなければ）

```yaml
- run: |
    CLUSTER_STATUS=$(aws ecs describe-clusters --clusters $ECS_CLUSTER_NAME --query 'clusters[0].status' --output text || true)
    if [[ "$CLUSTER_STATUS" != "ACTIVE" ]]; then
      aws ecs create-cluster --cluster-name $ECS_CLUSTER_NAME
    fi
```

* クラスターが存在しない場合に自動作成

---

### 3-9. ECS サービスリンクロール作成（初回のみ）

```yaml
- run: |
    ROLE_ARN=$(aws iam get-role --role-name AWSServiceRoleForECS --query 'Role.Arn' --output text 2>/dev/null || true)
    if [[ -z "$ROLE_ARN" || "$ROLE_ARN" == "None" ]]; then
      aws iam create-service-linked-role --aws-service-name ecs.amazonaws.com
    fi
```

* ECS が自分自身を管理するために必要なロールを作成
* 一度作成すれば以降は不要

---

### 3-10. ECS サービス作成 or 更新

```yaml
- run: |
    SERVICE_STATUS=$(aws ecs describe-services --cluster $ECS_CLUSTER_NAME --services $ECS_SERVICE_NAME --query 'services[0].status' --output text || true)
    if [[ "$SERVICE_STATUS" == "None" || -z "$SERVICE_STATUS" || "$SERVICE_STATUS" == "MISSING" ]]; then
      aws ecs create-service --cluster $ECS_CLUSTER_NAME --service-name $ECS_SERVICE_NAME \
        --task-definition $ECS_TASK_FAMILY --desired-count 1 --launch-type FARGATE \
        --network-configuration "awsvpcConfiguration={subnets=[${{ secrets.SUBNETS }}],securityGroups=[${{ secrets.SECURITY_GROUPS }}],assignPublicIp=ENABLED}"
    else
      aws ecs update-service --cluster $ECS_CLUSTER_NAME --service $ECS_SERVICE_NAME \
        --task-definition $ECS_TASK_FAMILY --force-new-deployment
    fi
```

* サービスが存在しなければ作成
* 存在すれば強制デプロイで更新

---

## 4. 注意点

1. **サブネット / セキュリティグループ**

   * GitHub Secrets には AWS 形式で設定
   * 複数ある場合はカンマ区切りで配列として渡す

2. **タスク定義 JSON**

   * `jq` で作成しているため、ヒアドキュメントのインデント問題なし

3. **Docker イメージ**

   * `github.sha` タグを使うことでコミットごとに固有のイメージ生成

4. **サービスリンクロール**

   * ECS サービス作成時に初回だけ必要
   * コンテナに付与するものではない

---

## 5. デプロイフローまとめ

1. GitHub Actions でソースコード取得
2. Java / Maven ビルド
3. Docker イメージビルド & ECR プッシュ
4. ECS タスク定義登録
5. ECS クラスター作成（存在しなければ）
6. ECS サービスリンクロール作成（初回のみ）
7. ECS サービス作成 or 更新

---

## 6. 参照

* [AWS ECS CLI Docs](https://docs.aws.amazon.com/cli/latest/reference/ecs/)
* [GitHub Actions: aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)
* [GitHub Actions: aws-actions/amazon-ecr-login](https://github.com/aws-actions/amazon-ecr-login)

イエッサー ✋
以下が今回の事例を踏まえた **Tip セクション追記案** です。
このまま末尾に「7. Tips」として追加できます。

---

## 7. Tips（実際にハマった事例と解決策）

### 事例: `ECS サービス作成時に AccessDeniedException`

#### **現象**

初回デプロイ時、ECS サービス作成ステップで以下のようなエラーが発生する場合があります：

```txt
An error occurred (AccessDeniedException) when calling the CreateService operation:
User: arn:aws:iam::<ACCOUNT_ID>:user/github-actions-user
is not authorized to perform: iam:CreateServiceLinkedRole
on resource: arn:aws:iam::<ACCOUNT_ID>:role/aws-service-role/ecs.amazonaws.com/AWSServiceRoleForECS
```

#### **原因**

ECS が内部的に使用する **サービスリンクロール (AWSServiceRoleForECS)** が
まだ作成されていない状態で `create-service` を実行したことが原因です。

ECS サービスリンクロールは、
ECS が VPC / ネットワーク / タスク管理を自動で行うために必要なロールです。

---

### **解決方法**

1. 一度だけ以下のコマンドを実行して、ECS 用のサービスリンクロールを作成します：

   ```bash
   aws iam create-service-linked-role --aws-service-name ecs.amazonaws.com
   ```

---
