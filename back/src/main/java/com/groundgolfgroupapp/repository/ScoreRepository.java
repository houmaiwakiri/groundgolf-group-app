package com.groundgolfgroupapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groundgolfgroupapp.entity.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
}
