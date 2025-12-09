package com.groundgolfgroupapp.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.groundgolfgroupapp.service.S3Service;

import software.amazon.awssdk.services.s3.model.S3Exception;

@RestController
@RequestMapping("/s3")
public class S3Controller {

    // S3操作用のサービスクラス
    private final S3Service s3;

    // コンストラクタでS3操作用のサービスクラスを注入する
    public S3Controller(S3Service s3Service) {
        this.s3 = s3Service;
    }

    @PostMapping("/upload")
    public String upload(
            @RequestParam("bucket") String bucket,
            // ファイルデータをMultipartFile型として受け取る
            @RequestParam("file") MultipartFile file) {

        try {
            // S3保存時のファイル名定義
            String key = file.getOriginalFilename();

            // アップロード処理(サービスクラスで処理を行う)
            s3.upload(
                    bucket,
                    key,
                    file.getInputStream(),
                    file.getSize());

            return "uploaded: " + key;

        } catch (IOException e) {
            return "IO error: " + e.getMessage();
        } catch (S3Exception e) {
            return "S3 error: " + e.getMessage();
        } catch (Exception e) {
            return "error: " + e.getMessage();
        }
    }
}
