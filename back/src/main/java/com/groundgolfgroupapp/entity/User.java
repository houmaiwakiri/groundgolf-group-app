package com.groundgolfgroupapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * ユーザー情報を表すエンティティ。
 * Cognito の sub を ID として保持します。
 */
@Entity
@Table(name = "users")
public class User {

    /**
     * ユーザーID（Cognito の sub を想定）。
     */
    @Id
    private String id;

    /**
     * 表示用のユーザー名。
     */
    private String username;

    /**
     * ユーザーのメールアドレス。
     */
    private String email;

    /**
     * JPA 用のデフォルトコンストラクタ。
     */
    public User() {}

    /**
     * 必要な値をまとめて設定するコンストラクタ。
     * @param id ユーザーID
     * @param username ユーザー名
     * @param email メールアドレス
     */
    public User(String id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
