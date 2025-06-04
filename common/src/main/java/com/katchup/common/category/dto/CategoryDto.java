package com.katchup.common.category.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class CategoryDto {
    private Long id;
    private String name;
    private String code;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<SubcategoryDto> subcategories;
} 