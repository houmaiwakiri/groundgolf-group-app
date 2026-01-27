package com.groundgolfgroupapp.dto;

import java.util.List;

public class ScoreRequest {
    // スコア登録時に渡すユーザーID。
    public String userId;
    // 各ホールの打数を順番に並べたリスト。
    public List<Integer> strokes;
}
