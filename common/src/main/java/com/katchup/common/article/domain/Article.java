package com.katchup.common.article.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @ElementCollection
    private List<Double> embedding;
    private Integer views;

    public Article(Long id, String title, String url, String urlHash, LocalDateTime pubDate, Long providerId, Long categoryId, String language, String shortSummary, String longSummary, String imageUrl, String context, LocalDateTime createdAt, List<Double> embedding, Integer views) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.urlHash = urlHash;
        this.pubDate = pubDate;
        this.providerId = providerId;
        this.categoryId = categoryId;
        this.language = language;
        this.shortSummary = shortSummary;
        this.longSummary = longSummary;
        this.imageUrl = imageUrl;
        this.context = context;
        this.createdAt = createdAt;
        this.embedding = embedding;
        this.views = views;
    }
} 