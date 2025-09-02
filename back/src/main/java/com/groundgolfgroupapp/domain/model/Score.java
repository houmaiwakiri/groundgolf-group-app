package com.groundgolfgroupapp.domain.model;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private String strokes; // 10Rのスコア

    // コンストラクタで List<Integer> を受け取り、文字列に変換
    public Score(List<Integer> strokesList) {
        this.strokes = strokesList.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));
    }

    // DBに保存した文字列を List<Integer> に戻す
    public List<Integer> getStrokesAsList() {
        return Arrays.stream(strokes.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }
}
