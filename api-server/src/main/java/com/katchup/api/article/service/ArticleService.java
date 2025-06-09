package com.katchup.api.article.service;

import com.katchup.api.article.domain.Article;
import com.katchup.api.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    public Article save(Article article) {
        article.setCreatedAt(LocalDateTime.now());
        return articleRepository.save(article);
    }

    public Optional<Article> findById(Long id) {
        return articleRepository.findById(id);
    }

    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    public List<Article> findByCategory(Long categoryId) {
        return articleRepository.findByCategoryId(categoryId);
    }

    public List<Article> findTrending(int limit) {
        return articleRepository.findTopByViews(limit);
    }

    public List<Article> findTrendingByCategory(Long categoryId, int limit) {
        return articleRepository.findTopByViewsByCategory(categoryId, limit);
    }

    public List<Article> searchByEmbedding(float[] vector, int limit) {
        return articleRepository.searchByEmbedding(vector, limit);
    }

    @Transactional
    public void incrementViews(Long id) {
        articleRepository.findById(id).ifPresent(article -> {
            article.setViews(article.getViews() + 1);
            articleRepository.save(article);
        });
    }
}
