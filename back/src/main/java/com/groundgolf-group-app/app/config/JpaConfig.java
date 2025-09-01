// infrastructure/config/JpaConfig.java
package com.example.app.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.example.app.adapter.repository")
public class JpaConfig {}
