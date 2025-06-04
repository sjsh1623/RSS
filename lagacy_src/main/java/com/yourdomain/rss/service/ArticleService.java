package com.yourdomain.rss.service;

import com.yourdomain.rss.domain.Article;
import com.yourdomain.rss.dto.ArticleRequestDto;
import com.yourdomain.rss.dto.ArticleResponseDto;
import com.yourdomain.rss.exception.NotFoundException;
import com.yourdomain.rss.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    @Transactional
    public Long createArticle(ArticleRequestDto dto) {
        Article article = Article.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        return articleRepository.save(article).getId();
    }

    @Transactional(readOnly = true)
    public ArticleResponseDto getArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Article not found"));
        return new ArticleResponseDto(article.getId(), article.getTitle(), article.getContent());
    }
} 