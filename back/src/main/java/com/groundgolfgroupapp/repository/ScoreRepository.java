package com.groundgolfgroupapp.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groundgolfgroupapp.entity.Score;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByUserId(String userId);

    List<Score> findTopNByUserIdOrderByIdDesc(String userId, Pageable pageable);
}
