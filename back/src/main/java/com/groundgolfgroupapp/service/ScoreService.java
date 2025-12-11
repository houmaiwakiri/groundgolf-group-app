package com.groundgolfgroupapp.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.groundgolfgroupapp.dto.ScoreStats;
import com.groundgolfgroupapp.entity.Score;
import com.groundgolfgroupapp.entity.User;
import com.groundgolfgroupapp.repository.ScoreRepository;
import com.groundgolfgroupapp.repository.UserRepository;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;

    // コンストラクタ
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

        // ユーザーがいれば取得、いなければ作成
        User user = userRepository.findById(userId)
                .orElseGet(() -> {
                    User newUser = new User(userId, userId, null);
                    return userRepository.save(newUser);
                });

        // スコア作成(Entityは毎回newする)
        Score score = new Score();
        score.setStrokes(strokes);
        // 外部キー用にuseridをセットする。
        score.setUser(user);

        return scoreRepository.save(score);
    }

    public void deleteScore(Long id) {
        scoreRepository.deleteById(id);
    }

    public Score updateScore(Long id, List<Integer> strokes) {
        // findByIdは自動実装されており、Optional型なので、orElseThrowが使える
        Score score = scoreRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("指定されたIDのスコアが存在しません: " + id));

        score.setStrokes(strokes);
        return scoreRepository.save(score);
    }

    // 統計情報取得
    public ScoreStats getScoreStats(String userId, Integer latest) {
        List<Score> scores = getScoresByUser(userId);
        if (latest != null && scores.size() > latest) {
            scores = scores.subList(scores.size() - latest, scores.size());
        }

        double averageScore = scores.stream()
                .mapToInt(s -> s.getStrokes().stream().mapToInt(Integer::intValue).sum())
                .average().orElse(0);

        int maxScore = scores.stream()
                .mapToInt(s -> s.getStrokes().stream().mapToInt(Integer::intValue).sum())
                .max().orElse(0);

        int minScore = scores.stream()
                .mapToInt(s -> s.getStrokes().stream().mapToInt(Integer::intValue).sum())
                .min().orElse(0);

        int holeCount = scores.get(0).getStrokes().size();
        List<Double> holeAverages = Arrays.stream(new double[holeCount])
                .map(i -> 0)
                .boxed()
                .collect(Collectors.toList());

        for (int i = 0; i < holeCount; i++) {
            final int idx = i;
            double avg = scores.stream()
                    .mapToInt(s -> s.getStrokes().get(idx))
                    .average()
                    .orElse(0);
            holeAverages.set(i, avg);
        }

        return new ScoreStats(averageScore, maxScore, minScore, holeAverages, scores.size());
    }

}
