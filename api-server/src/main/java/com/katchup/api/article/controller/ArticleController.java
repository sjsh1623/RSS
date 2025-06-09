package com.katchup.api.article.controller;

import com.katchup.api.article.domain.Article;
import com.katchup.api.article.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @PostMapping
    public ResponseEntity<Article> create(@RequestBody Article article) {
        return ResponseEntity.ok(articleService.save(article));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getById(@PathVariable Long id) {
        return articleService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Article>> getAll(@RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            return ResponseEntity.ok(articleService.findByCategory(categoryId));
        }
        return ResponseEntity.ok(articleService.findAll());
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<Void> incrementViews(@PathVariable Long id) {
        articleService.incrementViews(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Article>> getTrending(@RequestParam(required = false) Long categoryId, @RequestParam(defaultValue = "10") int limit) {
        if (categoryId != null) {
            return ResponseEntity.ok(articleService.findTrendingByCategory(categoryId, limit));
        }
        return ResponseEntity.ok(articleService.findTrending(limit));
    }

    @PostMapping("/search")
    public ResponseEntity<List<Article>> searchByEmbedding(@RequestBody float[] vector, @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(articleService.searchByEmbedding(vector, limit));
    }
}