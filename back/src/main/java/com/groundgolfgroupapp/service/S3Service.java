package com.groundgolfgroupapp.service;

import java.io.InputStream;

import org.springframework.stereotype.Service;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {

    // S3クライアント(変更不可)
    private final S3Client s3;

    public S3Service(S3Client s3) {
        this.s3 = s3;
    }

    // アップロード機能
    public void upload(String bucket, String key, InputStream file, long size) {
        s3.putObject(
                // どこに保存するか
                PutObjectRequest.builder()
                        .bucket(bucket)
                        .key(key)
                        .build(),
                // 何を保存するか
                RequestBody.fromInputStream(file, size));
    }

}