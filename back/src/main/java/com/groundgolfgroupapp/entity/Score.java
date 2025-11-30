package com.groundgolfgroupapp.entity;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

// JavaのクラスA:テーブルAのように1対1で対応するJPAの考え方

@Entity // 「このクラスをテーブルとして扱う」という宣言
public class Score {

    @Id // 主キー
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自動採番
    private Long id;

    // 自動でリストをテーブルとして扱う宣言
    // score_strokesというテーブルが自動で作成される
    @ElementCollection
    private List<Integer> strokes;

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

    public void setStrokes(List<Integer> strokes) {
        this.strokes = strokes;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
