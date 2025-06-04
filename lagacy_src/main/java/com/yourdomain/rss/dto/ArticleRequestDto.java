package com.yourdomain.rss.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ArticleRequestDto {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
} 