package com.katchup.api.article.repository;

import com.katchup.api.article.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByCategoryId(Long categoryId);

    @Query(value = "SELECT * FROM article ORDER BY views DESC LIMIT :limit", nativeQuery = true)
    List<Article> findTopByViews(@Param("limit") int limit);

    @Query(value = "SELECT * FROM article WHERE category_id = :categoryId ORDER BY views DESC LIMIT :limit", nativeQuery = true)
    List<Article> findTopByViewsByCategory(@Param("categoryId") Long categoryId, @Param("limit") int limit);

    // embedding 유사도 검색 (Postgres vector extension 필요, 예시)
    @Query(value = "SELECT * FROM article ORDER BY embedding <-> :vector LIMIT :limit", nativeQuery = true)
    List<Article> searchByEmbedding(@Param("vector") float[] vector, @Param("limit") int limit);
}
