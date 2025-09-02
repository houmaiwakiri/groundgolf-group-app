package com.groundgolfgroupapp.domain.model;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String strokes;

    // コンストラクタで List<Integer> を受け取り文字列に変換
    public Score(List<Integer> strokesList) {
        this.strokes = strokesList.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));
    }

    // JPA用のデフォルトコンストラクタ
    protected Score() {
    }

    // DBに保存した文字列を List<Integer> に戻す
    public List<Integer> getStrokesAsList() {
        if (strokes == null || strokes.isEmpty()) {
            return List.of(); // 空リストを返す
        }
        return Arrays.stream(strokes.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }
}
