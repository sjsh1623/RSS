package com.katchup.common.rss.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * RSS 소스 엔티티
 * 
 * RSS 피드를 제공하는 소스의 정보를 저장하는 엔티티입니다.
 * 피드 URL, 제공자 정보, 카테고리 등의 메타데이터를 포함합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RssSource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** RSS 피드 URL */
    @Column(nullable = false)
    private String url;

    /** 피드 언어 */
    private String language;

    /** 피드 제공자 ID */
    private Long providerId;

    /** 피드 제공자 이름 */
    private String providerName;

    /** 피드 제공자 타입 */
    private String providerType;

    /** 피드 카테고리 ID */
    private Long categoryId;

    /** 생성 일시 */
    private LocalDateTime createdAt;

    /** 수정 일시 */
    private LocalDateTime updatedAt;

    /**
     * RSS 소스 생성자
     * 
     * @param id 소스 ID
     * @param url RSS 피드 URL
     * @param language 피드 언어
     * @param providerId 피드 제공자 ID
     * @param providerName 피드 제공자 이름
     * @param providerType 피드 제공자 타입
     * @param categoryId 피드 카테고리 ID
     * @param createdAt 생성 일시
     * @param updatedAt 수정 일시
     */
    @Builder
    public RssSource(Long id, String url, String language, Long providerId, String providerName, String providerType, Long categoryId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.url = url;
        this.language = language;
        this.providerId = providerId;
        this.providerName = providerName;
        this.providerType = providerType;
        this.categoryId = categoryId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
} 