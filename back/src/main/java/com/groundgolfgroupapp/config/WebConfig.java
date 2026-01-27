package com.groundgolfgroupapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web 設定クラス。
 * CORS の許可設定を追加します。
 */
@Configuration
public class WebConfig {
    /**
     * CORS 設定を追加するための WebMvcConfigurer を返します。
     * @return CORS 設定済みの WebMvcConfigurer
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET","POST");
            }
        };
    }
}
