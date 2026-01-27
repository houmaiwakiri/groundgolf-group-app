package com.groundgolfgroupapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groundgolfgroupapp.entity.Score;

/**
 * Score エンティティ用のリポジトリ。
 * JpaRepository を継承することで、findAll/save などの基本機能が利用できます。
 */
@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    /**
     * ユーザーIDでスコアを検索します。
     * @param userId ユーザーID
     * @return 該当ユーザーのスコア一覧
     */
    List<Score> findByUserId(String userId);
}
