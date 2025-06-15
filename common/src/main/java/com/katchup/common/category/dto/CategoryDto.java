package com.katchup.common.category.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 카테고리 DTO
 * 
 * 카테고리 정보를 클라이언트에 전달하기 위한 DTO입니다.
 * 카테고리의 기본 정보와 하위 카테고리 목록을 포함합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@Getter
@AllArgsConstructor
public class CategoryDto {
    /** 카테고리 ID */
    private Long id;

    /** 카테고리 이름 */
    private String name;

    /** 카테고리 코드 */
    private String code;

    /** 생성 일시 */
    private LocalDateTime createdAt;

    /** 수정 일시 */
    private LocalDateTime updatedAt;

    /** 하위 카테고리 목록 */
    private List<SubcategoryDto> subcategories;
} 