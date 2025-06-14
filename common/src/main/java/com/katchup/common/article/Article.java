package com.katchup.common.article;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String url;

    @Column(name = "url_hash", nullable = false, unique = true)
    private String urlHash;

    @Column(name = "pub_date")
    private LocalDateTime pubDate;

    @Column(name = "provider_id")
    private Long providerId;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(nullable = false)
    private String language;

    @Column(name = "short_summary")
    private String shortSummary;

    @Column(name = "long_summary")
    private String longSummary;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String context;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "vector(1536)")
    private List<Float> embedding = new java.util.ArrayList<>();

    @Column
    private Integer views;
} 