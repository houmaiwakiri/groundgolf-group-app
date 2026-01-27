package com.groundgolfgroupapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groundgolfgroupapp.entity.User;

/**
 * User エンティティ用のリポジトリ。
 * ID 型は String（Cognito の sub）です。
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
