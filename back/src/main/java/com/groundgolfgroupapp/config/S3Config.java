package com.groundgolfgroupapp.config;

import java.net.URI;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    // test用
    @Bean
    public S3Client s3client() {
        return S3Client.builder()
                .endpointOverride(URI.create("http://minio:9000"))
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create("minioadmin", "minioadmin123"))) //test
                .region(software.amazon.awssdk.regions.Region.AP_NORTHEAST_1)
                .forcePathStyle(true)
                .build();
    }
}
