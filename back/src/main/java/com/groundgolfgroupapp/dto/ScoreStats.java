package com.groundgolfgroupapp.dto;

import java.util.List;

public class ScoreStats {
    // 1ラウンドあたりの平均打数。
    private double average;
    // ラウンド合計打数の最大値。
    private int max;
    // ラウンド合計打数の最小値。
    private int min;
    // ホールごとの平均打数。index=ホール番号-1。
    private List<Double> holeAverages;
    // 集計対象のラウンド数。
    private int rounds;

    // デフォルトコンストラクタ
    public ScoreStats() {
    }

    // 引数付きコンストラクタ
    public ScoreStats(double average, int max, int min, List<Double> holeAverages, int rounds) {
        this.average = average;
        this.max = max;
        this.min = min;
        this.holeAverages = holeAverages;
        this.rounds = rounds;
    }

    // getter/setter
    public double getAverage() {
        return average;
    }

    public void setAverage(double average) {
        this.average = average;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public List<Double> getHoleAverages() {
        return holeAverages;
    }

    public void setHoleAverages(List<Double> holeAverages) {
        this.holeAverages = holeAverages;
    }

    public int getRounds() {
        return rounds;
    }

    public void setRounds(int rounds) {
        this.rounds = rounds;
    }
}
