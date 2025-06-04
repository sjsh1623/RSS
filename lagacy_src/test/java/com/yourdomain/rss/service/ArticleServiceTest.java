package com.yourdomain.rss.service;

import com.yourdomain.rss.domain.Article;
import com.yourdomain.rss.dto.ArticleRequestDto;
import com.yourdomain.rss.dto.ArticleResponseDto;
import com.yourdomain.rss.exception.NotFoundException;
import com.yourdomain.rss.repository.ArticleRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class ArticleServiceTest {
    @Mock
    private ArticleRepository articleRepository;

    @InjectMocks
    private ArticleService articleService;

    public ArticleServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createArticle_success() {
        ArticleRequestDto dto = new ArticleRequestDto();
        // 리플렉션 등으로 필드 세팅 필요 (롬복 @Builder, @Setter 없으므로)
        // 테스트 목적상 간단히 처리
        Article article = Article.builder().title("title").content("content").build();
        when(articleRepository.save(any(Article.class))).thenReturn(article);
        Long id = articleService.createArticle(dto);
        assertNotNull(id);
    }

    @Test
    void getArticle_notFound() {
        when(articleRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(NotFoundException.class, () -> articleService.getArticle(1L));
    }
} 