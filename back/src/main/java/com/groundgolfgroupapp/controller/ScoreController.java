package com.groundgolfgroupapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.groundgolfgroupapp.dto.ScoreStats;
import com.groundgolfgroupapp.entity.Score;
import com.groundgolfgroupapp.service.ScoreService;

/**
 * スコア関連の API を提供するコントローラー。
 * CRUD と統計情報取得のエンドポイントをまとめています。
 */
@RestController
@RequestMapping("/scores")
public class ScoreController {

    private final ScoreService scoreService;

    /**
     * ScoreService を DI で受け取るコンストラクタ。
     * @param scoreService スコア操作を担当するサービス
     */
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    /**
     * 指定ユーザーのスコア一覧を取得します。
     * @param userId ユーザーID
     * @return スコア一覧
     */
    @GetMapping
    public List<Score> getScores(@RequestParam String userId) {
        return scoreService.getScoresByUser(userId);
    }

    /**
     * スコアを登録します。
     * @param userId ユーザーID
     * @param strokes 各ホールの打数配列
     * @return 登録されたスコア
     */
    @PostMapping
    public Score registerScore(@RequestParam String userId, @RequestBody List<Integer> strokes) {
        return scoreService.registerScore(strokes, userId);
    }

    /**
     * 既存スコアを更新します。
     * @param id スコアID
     * @param strokes 更新後の打数配列
     * @return 更新後のスコア
     */
    @PutMapping("/{id}")
    public Score updateScore(@PathVariable Long id, @RequestBody List<Integer> strokes) {
        return scoreService.updateScore(id, strokes);
    }

    /**
     * スコアを削除します。
     * @param id スコアID
     */
    @DeleteMapping("/{id}")
    public void deleteScore(@PathVariable Long id) {
        scoreService.deleteScore(id);
    }

    /**
     * スコア統計情報を取得します。
     * @param userId ユーザーID
     * @param latest 対象とする直近ラウンド数（任意）
     * @return 平均・最大・最小などの統計情報
     */
    @GetMapping("/stats")
    public ScoreStats getStats(@RequestParam String userId, @RequestParam(required = false) Integer latest) {
        return scoreService.getScoreStats(userId, latest);
    }
}
