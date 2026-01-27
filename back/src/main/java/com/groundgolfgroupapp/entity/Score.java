package com.groundgolfgroupapp.entity;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

/**
 * スコア情報を保持するエンティティ。
 * Java のクラスと DB テーブルを 1 対 1 で対応させる JPA の考え方を利用しています。
 */
@Entity // 「このクラスをテーブルとして扱う」という宣言
public class Score {

    /**
     * 主キー。DB 側で自動採番されます。
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自動採番
    private Long id;

    /**
     * 各ホールの打数リスト。
     * ElementCollection により、score_strokes テーブルが自動作成されます。
     */
    @ElementCollection
    private List<Integer> strokes;

    /**
     * スコアの所有者（ユーザー）。
     */
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Score() {
        // デフォルトコンストラクタ
        // JPA(Hibernate)がDBからデータを取り出す時、
        // リフレクションで new Score() を勝手に呼び出す。
        // 引数付きしか無いとインスタンスを作れずエラーになる。
    }

    // 引数を自分自身のprivate変数にセットする。
    // JPAのsave()が呼ぶと、テーブルにオブジェクトの中身を保存する。
    public Score(List<Integer> strokes) {
        this.strokes = strokes;
    }

    // private変数を外から参照するためのメソッド(カプセル化)
    public Long getId() {
        return id;
    }

    public List<Integer> getStrokes() {
        return strokes;
    }

    public User getUser() {
        return user;
    }

    // thisのプロパティにsetすることで、JPAがDBに保存する値を見つけることができる
    public void setStrokes(List<Integer> strokes) {
        this.strokes = strokes;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
