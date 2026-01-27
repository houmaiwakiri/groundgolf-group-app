package com.groundgolfgroupapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groundgolfgroupapp.entity.User;

@Repository
// Userエンティティ用のCRUD操作を提供するリポジトリ。
public interface UserRepository extends JpaRepository<User, String> {
}
