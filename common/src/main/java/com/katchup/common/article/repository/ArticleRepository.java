package com.katchup.common.article.repository;

import com.katchup.common.article.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
} 