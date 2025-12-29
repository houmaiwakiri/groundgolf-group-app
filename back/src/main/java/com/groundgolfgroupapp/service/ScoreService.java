package com.groundgolfgroupapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.groundgolfgroupapp.dto.ScoreStats;
import com.groundgolfgroupapp.entity.Score;
import com.groundgolfgroupapp.entity.User;
import com.groundgolfgroupapp.repository.ScoreRepository;
import com.groundgolfgroupapp.repository.UserRepository;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;
    // Service、Repositoryなどは、シングルトンで生成される。
    // なので、下記のようなプロパティを定義すると、ユーザー間で同じ値を見てしまう
    // private double averageScore;

    // コンストラクタ
    public ScoreService(ScoreRepository scoreRepository, UserRepository userRepository) {
        this.scoreRepository = scoreRepository;
        this.userRepository = userRepository;
    }

    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }

    public List<Score> getScoresByUser(String userId) {
        return scoreRepository.findByUserId(userId);
    }

    public Score registerScore(List<Integer> strokes, String userId) {

        // ユーザーがいれば取得、いなければ作成
        User user = userRepository.findById(userId)
                .orElseGet(() -> {
                    User newUser = new User(userId, userId, null);
                    return userRepository.save(newUser);
                });

        // スコア作成(Entityは毎回newする)
        Score score = new Score();
        score.setStrokes(strokes);
        // 外部キー用にuseridをセットする。
        score.setUser(user);

        return scoreRepository.save(score);
    }

    public void deleteScore(Long id) {
        scoreRepository.deleteById(id);
    }

    public Score updateScore(Long id, List<Integer> strokes) {
        // findByIdは自動実装されており、Optional型なので、orElseThrowが使える
        Score score = scoreRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("指定されたIDのスコアが存在しません: " + id));

        // Entityのセッター呼び出し
        score.setStrokes(strokes);
        return scoreRepository.save(score);
    }

    // 統計情報取得(latest=過去?件)
    public ScoreStats getScoreStats(String userId, Integer latest) {
        // Listは、型ではなくインターフェイス
        // 同じ型のオブジェクトを順番に入れる箱。オブジェクトへの参照が入っている。

        // 全ラウンド取得
        List<Score> allScores = getScoresByUser(userId);
        int totalRounds = allScores.size();

        // List型(entity.Score)の変数を定義
        List<Score> scores = allScores;
        // scoresの実体は、Scoreエンティティの参照(ArrayList<Score>)など、Listインターフェイスを実装したクラスが入っている
        // よって、要素数取得のscores.size()が実行できる
        if (latest != null && scores.size() > latest) {
            // subList(開始index,終了index)
            // ここで、参照先を変えている
            // 旧scores：[ Score1, Score2, Score3, Score4, Score5 ]
            // 新scores：subListビュー [ Score3, Score4, Score5 ]
            scores = scores.subList(scores.size() - latest, scores.size());
        }

        // データが無い場合は0埋めで返却
        if (scores.isEmpty()) {
            return new ScoreStats(0, 0, 0, List.of(), totalRounds);
        }

        // 今更だけどPHPとは違って、ここで型定義できる
        // steamに変換する(ASTERIAのstreamと同じ?)
        double averageScore = scores.stream()
                // sは、scoresの中の1要素。さらにstream化する。
                // さらに、Integerをintに変換して、SUMする
                .mapToInt(s -> s.getStrokes().stream().mapToInt(Integer::intValue).sum())
                // streamで出力されるため、そのストリームの平均を取得する
                // averageが値を返せない場合、0を返却する
                .average().orElse(0);

        int maxScore = scores.stream()
                .mapToInt(s -> s.getStrokes().stream().mapToInt(Integer::intValue).sum())
                .max().orElse(0);

        int minScore = scores.stream()
                .mapToInt(s -> s.getStrokes().stream().mapToInt(Integer::intValue).sum())
                .min().orElse(0);

        // ホール数取得
        int holeCount = scores.get(0).getStrokes().size();
        // 配列ベースのListを作り出す。容量(capacity)を指定する。sizeは0。
        List<Double> holeAverages = new ArrayList<>(holeCount);

        // ループを回してホールごとの平均値をholeAveragesに代入していく
        for (int i = 0; i < holeCount; i++) {
            int idx = i;
            double avg = scores.stream()
                    .mapToInt(s -> s.getStrokes().get(idx))
                    .average()
                    .orElse(0);
            holeAverages.add(avg);
        }

        return new ScoreStats(averageScore, maxScore, minScore, holeAverages, totalRounds);
    }

}
