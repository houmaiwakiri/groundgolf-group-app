package com.groundgolfgroupapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groundgolfgroupapp.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
