package com.katchup.common.rss.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FeedItem {
    private String url;
    private String title;
    private String pubDate;
    private Long providerId;
    private String providerName;
    private String providerType;
    private String content;
    private String imageUrl;
    private String language;
    private String shortSummary;
    private String longSummary;
    private String context;

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