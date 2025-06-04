package com.katchup.api.category.service;

import com.katchup.api.category.domain.Category;
import com.katchup.api.category.domain.Subcategory;
import com.katchup.api.category.dto.CategoryDto;
import com.katchup.api.category.dto.SubcategoryDto;
import com.katchup.api.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryDto> findAll() {
        return categoryRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<CategoryDto> findById(Long id) {
        return categoryRepository.findById(id).map(this::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<CategoryDto> findByName(String name) {
        return categoryRepository.findByName(name).map(this::toDto);
    }

    @Transactional
    public CategoryDto create(String name, String code) {
        Category category = Category.builder()
                .name(name)
                .code(code)
                .createdAt(java.time.LocalDateTime.now())
                .updatedAt(java.time.LocalDateTime.now())
                .subcategories(List.of())
                .build();
        return toDto(categoryRepository.save(category));
    }

    @Transactional
    public CategoryDto update(Long id, String name, String code) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Category not found"));
        category = Category.builder()
                .id(category.getId())
                .name(name)
                .code(code)
                .createdAt(category.getCreatedAt())
                .updatedAt(java.time.LocalDateTime.now())
                .subcategories(category.getSubcategories())
                .build();
        return toDto(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDto toDto(Category category) {
        List<SubcategoryDto> subDtos = category.getSubcategories() == null ? List.of() : category.getSubcategories().stream()
                .map(this::toSubcategoryDto)
                .collect(Collectors.toList());
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getCode(),
                category.getCreatedAt(),
                category.getUpdatedAt(),
                subDtos
        );
    }

    private SubcategoryDto toSubcategoryDto(Subcategory sub) {
        return new SubcategoryDto(
                sub.getId(),
                sub.getName(),
                sub.getCode(),
                sub.getCreatedAt(),
                sub.getUpdatedAt()
        );
    }
} 