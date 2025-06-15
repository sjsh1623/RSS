package com.katchup.common.rss.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * RSS 피드 아이템 모델
 * 
 * RSS 피드에서 가져온 개별 기사 아이템을 표현하는 모델입니다.
 * 기사의 기본 정보와 메타데이터를 포함합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@Getter
@AllArgsConstructor
public class FeedItem {
    /** 기사 원문 URL */
    private String url;

    /** 기사 제목 */
    private String title;

    /** 기사 발행일시 */
    private String pubDate;

    /** 기사 제공자 ID */
    private Long providerId;

    /** 기사 제공자 이름 */
    private String providerName;

    /** 기사 제공자 타입 */
    private String providerType;

    /** 기사 본문 내용 */
    private String content;

    /** 기사 대표 이미지 URL */
    private String imageUrl;

    /** 기사 언어 */
    private String language;

    /** 기사 짧은 요약 */
    private String shortSummary;

    /** 기사 상세 요약 */
    private String longSummary;

    /** 기사 본문 내용 (원문) */
    private String context;

    /**
     * 기본 생성자
     * 
     * @param url 기사 원문 URL
     * @param title 기사 제목
     * @param pubDate 기사 발행일시
     * @param providerId 기사 제공자 ID
     * @param providerName 기사 제공자 이름
     * @param providerType 기사 제공자 타입
     * @param content 기사 본문 내용
     * @param imageUrl 기사 대표 이미지 URL
     * @param language 기사 언어
     */
    public FeedItem(String url, String title, String pubDate, Long providerId, String providerName, String providerType, String content, String imageUrl, String language) {
        this.url = url;
        this.title = title;
        this.pubDate = pubDate;
        this.providerId = providerId;
        this.providerName = providerName;
        this.providerType = providerType;
        this.content = content;
        this.imageUrl = imageUrl;
        this.language = language;
        this.shortSummary = "";
        this.longSummary = "";
        this.context = "";
    }
} 