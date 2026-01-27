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

@RestController
@RequestMapping("/scores")
public class ScoreController {

    private final ScoreService scoreService;

    // コンストラクタでサービス注入
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    // ユーザー単位のスコア取得
    @GetMapping
    public List<Score> getScores(@RequestParam String userId) {
        // クエリ文字列の userId を受け取り、対象ユーザーのスコアを返す。
        return scoreService.getScoresByUser(userId);
    }

    // スコア登録
    @PostMapping
    public Score registerScore(@RequestParam String userId, @RequestBody List<Integer> strokes) {
        // 送信された打数リスト(strokes)をユーザーIDと合わせて登録する。
        return scoreService.registerScore(strokes, userId);
    }

    // スコア更新
    @PutMapping("/{id}")
    public Score updateScore(@PathVariable Long id, @RequestBody List<Integer> strokes) {
        // パス変数のスコアIDを指定して打数リストを更新する。
        return scoreService.updateScore(id, strokes);
    }

    // スコア削除
    @DeleteMapping("/{id}")
    public void deleteScore(@PathVariable Long id) {
        // 指定したIDのスコアを削除する。
        scoreService.deleteScore(id);
    }

    // 統計情報取得
    // latest=統計情報の対象期間
    @GetMapping("/stats")
    public ScoreStats getStats(@RequestParam String userId, @RequestParam(required = false) Integer latest) {
        // latestが指定されていない場合は全期間の統計を返す。
        return scoreService.getScoreStats(userId, latest);
    }
}
