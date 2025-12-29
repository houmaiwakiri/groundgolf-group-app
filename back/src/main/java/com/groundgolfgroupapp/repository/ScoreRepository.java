package com.groundgolfgroupapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groundgolfgroupapp.entity.Score;

// 既存機能(finfAll、saveなど)は、継承不要で使用できる
// 独自の検索条件を使用したい場合などは、JPAを継承して定義する

@Repository
// JPAのインターフェイスで、spring bootが実装するため、returnは不要
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByUserId(String userId);// ユーザー単位でスコア取得する
}
