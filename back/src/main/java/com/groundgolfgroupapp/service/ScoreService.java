package com.groundgolfgroupapp.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.groundgolfgroupapp.entity.Score;
import com.groundgolfgroupapp.repository.ScoreRepository;

@Service
public class ScoreService {

    private final ScoreRepository repository;

    public ScoreService(ScoreRepository repository) {
        this.repository = repository;
    }

    public Score registerScore(List<Integer> strokes) {
        Score score = new Score(strokes);
        return repository.save(score);
    }

    public List<Score> getAllScores() {
        return repository.findAll();
    }
}
