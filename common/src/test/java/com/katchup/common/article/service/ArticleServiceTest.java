package com.katchup.common.article.service;

import com.katchup.common.article.domain.Article;
import com.katchup.common.article.repository.ArticleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ArticleServiceTest {
    @Mock
    private ArticleRepository articleRepository;
    @InjectMocks
    private ArticleService articleService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("모든 기사 조회")
    void findAll_success() {
        // given
        Article article1 = Article.builder()
            .id(1L)
            .title("First Article")
            .url("http://example.com/1")
            .build();
            
        Article article2 = Article.builder()
            .id(2L)
            .title("Second Article")
            .url("http://example.com/2")
            .build();
            
        when(articleRepository.findAll()).thenReturn(List.of(article1, article2));

        // when
        var result = articleService.findAll();

        // then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getTitle()).isEqualTo("First Article");
        assertThat(result.get(1).getTitle()).isEqualTo("Second Article");
    }

    @Test
    @DisplayName("ID로 기사 조회 성공")
    void findById_success() {
        // given
        Long articleId = 1L;
        Article article = Article.builder()
            .id(articleId)
            .title("Test Article")
            .url("http://example.com/test")
            .build();
            
        when(articleRepository.findById(articleId)).thenReturn(Optional.of(article));

        // when
        var result = articleService.findById(articleId);

        // then
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(articleId);
        assertThat(result.get().getTitle()).isEqualTo("Test Article");
    }

    @Test
    @DisplayName("ID로 기사 조회 실패 - 기사 없음")
    void findById_notFound() {
        // given
        Long articleId = 999L;
        when(articleRepository.findById(articleId)).thenReturn(Optional.empty());

        // when
        var result = articleService.findById(articleId);

        // then
        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("기사 저장 성공")
    void save_success() {
        // given
        Article article = Article.builder()
            .id(1L)
            .title("New Article")
            .url("http://example.com/new")
            .build();
            
        when(articleRepository.save(any(Article.class))).thenReturn(article);

        // when
        var saved = articleService.save(article);

        // then
        assertThat(saved.getId()).isEqualTo(1L);
        assertThat(saved.getTitle()).isEqualTo("New Article");
        verify(articleRepository, times(1)).save(any(Article.class));
    }

    @Test
    @DisplayName("URL로 기사 조회 성공")
    void findByUrl_success() {
        // given
        String url = "http://example.com/test";
        Article article = Article.builder()
            .id(1L)
            .title("Test Article")
            .url(url)
            .build();
            
        when(articleRepository.findByUrl(url)).thenReturn(Optional.of(article));

        // when
        var result = articleService.findByUrl(url);

        // then
        assertThat(result).isPresent();
        assertThat(result.get().getUrl()).isEqualTo(url);
        assertThat(result.get().getTitle()).isEqualTo("Test Article");
    }

    @Test
    @DisplayName("카테고리별 기사 조회")
    void findByCategory_success() {
        // given
        Long categoryId = 1L;
        Article article1 = Article.builder()
            .id(1L)
            .title("Category Article 1")
            .url("http://example.com/1")
            .build();
            
        Article article2 = Article.builder()
            .id(2L)
            .title("Category Article 2")
            .url("http://example.com/2")
            .build();
            
        when(articleRepository.findByCategoryId(categoryId)).thenReturn(List.of(article1, article2));

        // when
        var result = articleService.findByCategoryId(categoryId);

        // then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getTitle()).isEqualTo("Category Article 1");
        assertThat(result.get(1).getTitle()).isEqualTo("Category Article 2");
    }
} 