package com.groundgolfgroupapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.groundgolfgroupapp.entity.Score;
import com.groundgolfgroupapp.entity.User;
import com.groundgolfgroupapp.repository.ScoreRepository;
import com.groundgolfgroupapp.repository.UserRepository;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;

    public ScoreService(ScoreRepository scoreRepository, UserRepository userRepository) {
        this.scoreRepository = scoreRepository;
        this.userRepository = userRepository;
    }

    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

    public List<Score> getScoresByUser(String userId) {
        return scoreRepository.findByUserId(userId);
    }

    public Score registerScore(List<Integer> strokes, String userId) {

        User user = userRepository.findById(userId)
                .orElseGet(() -> {
                    User newUser = new User(userId, userId, null);
                    return userRepository.save(newUser);
                });

        Score score = new Score();
        score.setStrokes(strokes);
        score.setUser(user);

        return scoreRepository.save(score);
    }

    public void deleteScore(Long id) {
        scoreRepository.deleteById(id);
    }

    public Score updateScore(Long id, List<Integer> strokes) {
        Score score = scoreRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("指定されたIDのスコアが存在しません: " + id));

        score.setStrokes(strokes);
        return scoreRepository.save(score);
    }
}
