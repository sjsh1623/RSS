package com.katchup.api.category.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SubcategoryDto {
    private Long id;
    private String name;
    private String code;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 