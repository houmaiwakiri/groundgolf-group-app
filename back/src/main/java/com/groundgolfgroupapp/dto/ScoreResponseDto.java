package com.groundgolfgroupapp.dto;

import java.util.List;

import com.groundgolfgroupapp.entity.Score;

/**
 * スコア情報をAPIレスポンスとして返すためのDTO。
 * 
 * Entity (Score) をそのまま返さず、必要な情報だけを整形して渡す。
 */
public class ScoreResponseDto {

    private Long id;
    private List<Integer> strokes;

    public ScoreResponseDto(Long id, List<Integer> strokes) {
        this.id = id;
        this.strokes = strokes;
    }

    /** Entity → DTO 変換用コンストラクタ */
    public ScoreResponseDto(Score score) {
        this.id = score.getId();
        this.strokes = score.getStrokes();
    }

    public Long getId() {
        return id;
    }

    public List<Integer> getStrokes() {
        return strokes;
    }
}
