package com.katchup.api.article.controller;

import com.katchup.api.article.dto.ArticleRequestDto;
import com.katchup.api.article.dto.ArticleResponseDto;
import com.katchup.api.article.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @PostMapping
    public ResponseEntity<Long> createArticle(@RequestBody @Valid ArticleRequestDto dto) {
        return ResponseEntity.ok(articleService.createArticle(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponseDto> getArticle(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticle(id));
    }
} 