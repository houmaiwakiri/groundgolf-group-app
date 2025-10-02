# ECSにapi(Java)をデプロイする

- VPC + サブネット + IGW + SG + ECR + ECS(Fargate) + EC2(MySQL)
- ALB不使用
- RDSではなくEC2を使用

## 1. VPC の作成

- **CIDR 設定**（例: `10.0.0.0/16`）
- **パブリックサブネット**（例: `10.0.1.0/24`）
- **プライベートサブネット**（例: `10.0.2.0/24`）  
- **インターネットゲートウェイ**のアタッチ  
- **ルートテーブル**設定（パブリックサブネットから外に出れるように 0.0.0.0/0 → IGW）  

---

## 2. セキュリティグループの作成

- **ECS用 SG**
  - インバウンド：`8080/tcp`（Javaアプリ用）
  - アウトバウンド：全許可（デフォルトでOK）
- **EC2(MySQL)用 SG**
  - インバウンド：`3306/tcp`（ECSタスクからの接続を許可）
  - アウトバウンド：全許可  

---

## 3. ECR の準備

1. **リポジトリ作成**  
   - `groundgolf-group-api`

2. **Javaアプリ用 Dockerfile**

    ```dockerfile
    FROM eclipse-temurin:21-jdk
    WORKDIR /app
    COPY target/*.jar app.jar
    EXPOSE 8080
    ENTRYPOINT ["java", "-jar", "app.jar"]
    ```

3. **ビルド & プッシュ**

```bash
docker build -t groundgolf-group-api ./back
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin <account_id>.dkr.ecr.ap-northeast-1.amazonaws.com
docker tag groundgolf-group-api:latest <account_id>.dkr.ecr.ap-northeast-1.amazonaws.com/groundgolf-group-api:latest
docker push <account_id>.dkr.ecr.ap-northeast-1.amazonaws.com/groundgolf-group-api:latest
```

---

## 4. ECS クラスターの作成

- **クラスタータイプ**: Fargate
- **VPC 選択**: 作成した VPC
- **サブネット**: パブリックサブネットを選択

---

## 5. タスク定義の作成（Javaアプリのみ）

- **起動タイプ**: Fargate
- **コンテナ定義**

  - イメージ: `<account_id>.dkr.ecr.ap-northeast-1.amazonaws.com/groundgolf-group-api:latest`
  - ポートマッピング: 8080 → 8080
  - 環境変数:

    ```env
    SPRING_DATASOURCE_URL=jdbc:mysql://<EC2のプライベートIP>:3306/appdb
    SPRING_DATASOURCE_USERNAME=appuser
    SPRING_DATASOURCE_PASSWORD=apppass
    ```

※ EC2 に MySQL をインストールしておき、データベースとユーザーを作成する。

---

## 6. ECS サービスの作成

- **起動タイプ**: Fargate
- **タスク定義**: 上記の Java アプリタスクを選択
- **VPC/サブネット**: パブリックサブネット
- **セキュリティグループ**: 8080 を開放
- **パブリック IP 割り当て**: 有効化

---

## 7. 動作確認

1. EC2 上の MySQL に ECS から接続できることを確認

   - `mysql -h <EC2のプライベートIP> -u appuser -p`
2. ECS サービス起動後、タスク詳細から **Public IP** を確認
3. ブラウザで `http://<Public IP>:8080` にアクセス
4. Spring Boot アプリが DB に接続できれば成功

---
