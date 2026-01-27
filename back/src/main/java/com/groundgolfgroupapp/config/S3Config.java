package com.groundgolfgroupapp.config;

import java.net.URI;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

/**
 * S3Client の設定クラス。
 * ローカルの MinIO を利用する前提でエンドポイントを指定しています。
 */
@Configuration
public class S3Config {

    /**
     * S3Client の Bean 定義。
     * @return MinIO 用の S3Client
     */
    @Bean
    public S3Client s3client() {
        return S3Client.builder()
                .endpointOverride(URI.create("http://minio:9000"))
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create("minioadmin", "minioadmin123")))
                .region(Region.AP_NORTHEAST_1)
                .forcePathStyle(true)
                .build();
    }
}
