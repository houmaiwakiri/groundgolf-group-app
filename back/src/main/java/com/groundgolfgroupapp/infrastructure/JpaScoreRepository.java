package com.groundgolfgroupapp.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groundgolfgroupapp.domain.model.Score;
import com.groundgolfgroupapp.domain.repository.ScoreRepository;

@Repository
public interface JpaScoreRepository extends JpaRepository<Score, Long>, ScoreRepository {
}
