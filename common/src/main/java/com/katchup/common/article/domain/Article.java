package com.katchup.common.article.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AccessLevel;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 아티클 엔티티
 * 
 * RSS 피드에서 가져온 기사를 저장하는 엔티티입니다.
 * 기사의 메타데이터, 콘텐츠, 임베딩 벡터 등을 포함합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 기사 원문 URL */
    private String url;

    /** URL의 해시값 (중복 방지용) */
    private String urlHash;

    /** 기사 제목 */
    private String title;

    /** 기사 발행일시 */
    private LocalDateTime pubDate;

    /** 기사 제공자 ID */
    private Long providerId;

    /** 기사 카테고리 ID */
    private Long categoryId;

    /** 기사 언어 */
    private String language;

    /** 기사 짧은 요약 */
    private String shortSummary;

    /** 기사 상세 요약 */
    private String longSummary;

    /** 기사 대표 이미지 URL */
    private String imageUrl;

    /** 기사 본문 내용 */
    private String context;

    /** 기사 저장 일시 */
    private LocalDateTime createdAt;

    /** 기사 콘텐츠의 임베딩 벡터 */
    @ElementCollection
    private List<Double> embedding;

    /** 기사 조회수 */
    private Integer views;

    /**
     * 아티클 생성자
     * 
     * @param id 아티클 ID (새로 생성시 null)
     * @param title 기사 제목
     * @param url 기사 원문 URL
     * @param urlHash URL의 해시값
     * @param pubDate 기사 발행일시
     * @param providerId 기사 제공자 ID
     * @param categoryId 기사 카테고리 ID
     * @param language 기사 언어
     * @param shortSummary 기사 짧은 요약
     * @param longSummary 기사 상세 요약
     * @param imageUrl 기사 대표 이미지 URL
     * @param context 기사 본문 내용
     * @param createdAt 기사 저장 일시
     * @param embedding 기사 콘텐츠의 임베딩 벡터
     * @param views 기사 조회수
     */
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