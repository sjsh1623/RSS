package com.katchup.api.article.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "article")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String url;

    @Column(nullable = false, unique = true)
    private String urlHash;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime pubDate;

    @Column(nullable = false)
    private Long providerId;

    @Column(nullable = false)
    private Long categoryId;

    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String shortSummary;

    @Column(nullable = false)
    private String longSummary;

    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String context;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // embedding: float[] (Postgres array)
    @Column(name = "embedding", columnDefinition = "float8[]")
    private float[] embedding;

    @Column(nullable = false)
    private Long views = 0L;
}
