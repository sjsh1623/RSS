package com.yourdomain.rss.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ArticleResponseDto {
    private Long id;
    private String title;
    private String content;
} 