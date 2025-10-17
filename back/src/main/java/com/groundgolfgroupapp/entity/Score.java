package com.groundgolfgroupapp.entity;

import java.util.List;

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
    private List<Integer> strokes;

    // エンティティクラスには必ず引数なしのコンストラクタが必要であるため記載
    public Score() {
    }

    public Score(List<Integer> strokes) {
        this.strokes = strokes;
    }

    public Long getId() {
        return id;
    }

    public List<Integer> getStrokes() {
        return strokes;
    }
}
