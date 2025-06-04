package com.katchup.common.article.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ArticleResponseDto {
    private Long id;
    private String url;
    private String urlHash;
    private String title;
    private LocalDateTime pubDate;
    private Long providerId;
    private Long categoryId;
    private String language;
    private String shortSummary;
    private String longSummary;
    private String imageUrl;
    private String context;
    private LocalDateTime createdAt;
    private List<Double> embedding;
    private Integer views;
} 