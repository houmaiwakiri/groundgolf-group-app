package com.groundgolfgroupapp.domain.repository;

import java.util.List;

import com.groundgolfgroupapp.domain.model.Score;

public interface ScoreRepository {
    Score save(Score score);
    List<Score> findAll();
}
