package com.groundgolfgroupapp.application;

import java.util.List;

import org.springframework.stereotype.Service;

import com.groundgolfgroupapp.domain.model.Score;
import com.groundgolfgroupapp.domain.repository.ScoreRepository;

@Service
public class ScoreService {

    private final ScoreRepository repository;

    public ScoreService(ScoreRepository repository) {
        this.repository = repository;
    }

    // Controllerから渡された List<Integer> を Entity に変換して保存
    public Score registerScore(List<Integer> strokes) {
        Score score = new Score(strokes);
        return repository.save(score);
    }

    public List<Score> getAllScores() {
        return repository.findAll();
    }
}
