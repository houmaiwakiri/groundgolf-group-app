package com.groundgolfgroupapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.groundgolfgroupapp.entity.Score;
import com.groundgolfgroupapp.repository.ScoreRepository;

@Service
public class ScoreService {

    private final ScoreRepository repository;

    public ScoreService(ScoreRepository repository) {
        this.repository = repository;
    }

    public List<Score> getAllScores() {
        return repository.findAll();
    }

    public Score registerScore(List<Integer> strokes) {
        Score score = new Score(strokes);
        return repository.save(score);
    }

    public void deleteScore(Long id) {
        repository.deleteById(id);
    }

    public Score updateScore(Long id, List<Integer> strokes) {
        Score score = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("指定されたIDのスコアが存在しません: " + id));

        score.setStrokes(strokes);
        return repository.save(score);
    }

}
