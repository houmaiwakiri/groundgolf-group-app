// usecase/interactor/RegisterScoreInteractor.java
package com.example.app.usecase.interactor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.app.domain.model.Score;
import com.example.app.domain.repository.ScoreRepository;

import java.util.List;

@Service
@Transactional
public class RegisterScoreInteractor {

    private final ScoreRepository scoreRepository;

    public RegisterScoreInteractor(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    public List<Score> handle(List<Score> scores) {
        // ラウンドチェック（1～10）
        for (Score s : scores) {
            if (s.getRound() < 1 || s.getRound() > 10) {
                throw new IllegalArgumentException("Round must be between 1 and 10");
            }
        }
        return scoreRepository.saveAll(scores);
    }
}
