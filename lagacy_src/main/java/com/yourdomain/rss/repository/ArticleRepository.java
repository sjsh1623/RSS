package com.yourdomain.rss.repository;

import com.yourdomain.rss.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
} 