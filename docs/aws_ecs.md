# ECS に Java API をデプロイする手順（修正版）

## 1. VPC の作成

* **CIDR 設定**: `10.0.0.0/16`
* **サブネット**

  * **パブリックサブネット**: `10.0.1.0/24`（ECS API 用）
  * **プライベートサブネット**: `10.0.2.0/24`（EC2 MySQL 用）
* **インターネットゲートウェイ**作成 & VPC にアタッチ
* **NAT Gateway** 作成（パブリックサブネットに配置, Elastic IP 割当）
* **ルートテーブル**

  * パブリック用: `0.0.0.0/0 → IGW`（ECS から外に出られる）
  * プライベート用: `0.0.0.0/0 → NAT GW`（MySQL EC2 が更新時に外に出られる）

---

## 2. セキュリティグループの作成

* **ECS 用 SG**

  * インバウンド: `8080/tcp`（0.0.0.0/0 → Java API 公開用）
  * アウトバウンド: 全許可（デフォルトで OK）
* **EC2 (MySQL) 用 SG**

  * インバウンド: `3306/tcp`（ECS SG のみ許可）
  * アウトバウンド: 全許可（デフォルトで OK）

---

## 3. ECR の準備

1. **リポジトリ作成**

   * 名前: `groundgolf-group-api`

2. **Java アプリ用 Dockerfile**

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

## 4. EC2 (MySQL) の作成

* **配置**: プライベートサブネット
* **AMI**: Amazon Linux 2 / Ubuntu 推奨
* **SG**: 上記の「EC2(MySQL) SG」を指定
* **セットアップ例**

  ```bash
  sudo yum install -y mariadb-server
  sudo systemctl enable mariadb
  sudo systemctl start mariadb
  mysql_secure_installation

  # DB とユーザー作成例
  mysql -u root -p
  CREATE DATABASE appdb;
  CREATE USER 'appuser'@'%' IDENTIFIED BY 'apppass';
  GRANT ALL PRIVILEGES ON appdb.* TO 'appuser'@'%';
  FLUSH PRIVILEGES;
  ```

---

## 5. ECS クラスターの作成

* **クラスタータイプ**: Fargate
* **VPC**: 作成した VPC
* **サブネット**: パブリックサブネットを選択（ECS タスクは Public IP 割当）

---

## 6. タスク定義の作成（Java API）

* **起動タイプ**: Fargate
* **コンテナ定義**

  * イメージ: `<account_id>.dkr.ecr.ap-northeast-1.amazonaws.com/groundgolf-group-api:latest`
  * ポートマッピング: 8080 → 8080
  * 環境変数:

    ```env
    SPRING_DATASOURCE_URL=jdbc:mysql://<EC2のプライベートIP>:3306/appdb
    SPRING_DATASOURCE_USERNAME=appuser
    SPRING_DATASOURCE_PASSWORD=apppass
    ```

---

## 7. ECS サービスの作成

* **起動タイプ**: Fargate
* **タスク定義**: 上記 Java API タスク
* **サブネット**: パブリックサブネット
* **セキュリティグループ**: ECS 用 SG（8080 開放済み）
* **パブリック IP 割り当て**: 有効化

---

## 8. 動作確認

1. **EC2(MySQL) の確認**

   * VPC 内から接続確認（例: bastion / Systems Manager Session Manager 経由）

   ```bash
   mysql -h <EC2のプライベートIP> -u appuser -p
   ```

   → DB にログインできれば OK

2. **ECS タスク起動後の確認**

   * タスク詳細から **Public IP** を確認
   * ブラウザで `http://<Public IP>:8080` にアクセス
   * Java API が MySQL に接続できれば成功

---

## ポイント

* **ALB 不使用** → ECS タスクに Public IP を直接付与してアクセス
* **RDS 不使用** → EC2 に MySQL を手動セットアップ
* **最小構成** → 個人開発用、冗長化・オートスケールなし
