package com.katchup.common.category.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 카테고리 엔티티
 * 
 * 콘텐츠를 분류하는 카테고리 정보를 저장하는 엔티티입니다.
 * 카테고리 이름, 코드, 하위 카테고리 목록 등을 포함합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 카테고리 이름 */
    @Column(nullable = false)
    private String name;

    /** 카테고리 코드 (고유 식별자) */
    @Column(nullable = false, unique = true)
    private String code;

    /** 생성 일시 */
    private LocalDateTime createdAt;

    /** 수정 일시 */
    private LocalDateTime updatedAt;

    /** 하위 카테고리 목록 */
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "category_id")
    private List<Subcategory> subcategories;

    /**
     * 카테고리 생성자
     * 
     * @param id 카테고리 ID
     * @param name 카테고리 이름
     * @param code 카테고리 코드
     * @param createdAt 생성 일시
     * @param updatedAt 수정 일시
     * @param subcategories 하위 카테고리 목록
     */
    @Builder
    public Category(Long id, String name, String code, LocalDateTime createdAt, LocalDateTime updatedAt, List<Subcategory> subcategories) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.subcategories = subcategories;
    }
} 