package com.groundgolfgroupapp.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.groundgolfgroupapp.service.S3Service;

import software.amazon.awssdk.services.s3.model.S3Exception;

/**
 * S3 へのアップロード API を提供するコントローラー。
 * バケット名とファイルを受け取り、S3 に保存します。
 */
@RestController
@RequestMapping("/s3")
public class S3Controller {

    /**
     * S3 操作用のサービス。
     */
    private final S3Service s3;

    /**
     * S3Service を DI で受け取るコンストラクタ。
     * @param s3Service S3 へのアップロード処理を行うサービス
     */
    public S3Controller(S3Service s3Service) {
        this.s3 = s3Service;
    }

    /**
     * ファイルを S3 にアップロードします。
     * @param bucket アップロード先バケット名
     * @param file アップロード対象ファイル
     * @return アップロード結果メッセージ
     */
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
