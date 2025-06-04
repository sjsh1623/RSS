package com.katchup.common.article.service;

import com.katchup.common.article.domain.Article;
import com.katchup.common.article.repository.ArticleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

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
    void findAll() {
        Article article = Article.builder().id(1L).title("title").build();
        when(articleRepository.findAll()).thenReturn(List.of(article));
        var result = articleService.findAll();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("title");
    }

    @Test
    void findById() {
        Article article = Article.builder().id(1L).title("title").build();
        when(articleRepository.findById(1L)).thenReturn(Optional.of(article));
        var result = articleService.findById(1L);
        assertThat(result).isPresent();
        assertThat(result.get().getTitle()).isEqualTo("title");
    }

    @Test
    void save() {
        Article article = Article.builder().id(1L).title("title").build();
        when(articleRepository.save(any(Article.class))).thenReturn(article);
        var saved = articleService.save(article);
        assertThat(saved.getId()).isEqualTo(1L);
        assertThat(saved.getTitle()).isEqualTo("title");
    }
} 