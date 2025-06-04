package com.katchup.common.article.service;

import com.katchup.common.article.domain.Article;
import com.katchup.common.article.dto.ArticleResponseDto;
import com.katchup.common.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    @Transactional(readOnly = true)
    public List<ArticleResponseDto> findAll() {
        return articleRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<ArticleResponseDto> findById(Long id) {
        return articleRepository.findById(id).map(this::toDto);
    }

    @Transactional
    public Article save(Article article) {
        return articleRepository.save(article);
    }

    private ArticleResponseDto toDto(Article article) {
        return new ArticleResponseDto(
                article.getId(),
                article.getUrl(),
                article.getUrlHash(),
                article.getTitle(),
                article.getPubDate(),
                article.getProviderId(),
                article.getCategoryId(),
                article.getLanguage(),
                article.getShortSummary(),
                article.getLongSummary(),
                article.getImageUrl(),
                article.getContext(),
                article.getCreatedAt(),
                article.getEmbedding(),
                article.getViews()
        );
    }
} 