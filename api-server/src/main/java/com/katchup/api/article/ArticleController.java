package com.katchup.api.article;

import com.katchup.common.article.dto.ArticleResponseDto;
import com.katchup.common.article.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Article API", description = "기사 관련 API")
@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @Operation(summary = "모든 기사 조회")
    @GetMapping
    public ResponseEntity<List<ArticleResponseDto>> getAll() {
        return ResponseEntity.ok(articleService.findAll());
    }

    @Operation(summary = "ID로 기사 단건 조회")
    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponseDto> getById(@PathVariable Long id) {
        return articleService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 