package com.groundgolfgroupapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring Boot のエントリーポイント。
 */
@SpringBootApplication
public class AppApplication {
    /**
     * アプリケーション起動用の main メソッド。
     * @param args 起動引数
     */
    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }
}
