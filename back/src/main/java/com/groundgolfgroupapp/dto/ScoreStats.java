package com.groundgolfgroupapp.dto;

import java.util.List;

public class ScoreStats {
    private double average;
    private int max;
    private int min;
    private List<Double> holeAverages;
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
