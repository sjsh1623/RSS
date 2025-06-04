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
} 