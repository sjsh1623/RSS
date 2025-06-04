package com.katchup.common.rss.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RssSource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    private String language;
    private Long providerId;
    private String providerName;
    private String providerType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Builder
    public RssSource(Long id, String url, String language, Long providerId, String providerName, String providerType, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.url = url;
        this.language = language;
        this.providerId = providerId;
        this.providerName = providerName;
        this.providerType = providerType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
} 