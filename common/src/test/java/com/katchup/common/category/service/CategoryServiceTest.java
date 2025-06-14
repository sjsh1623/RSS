package com.katchup.common.category.service;

import com.katchup.common.category.domain.Category;
import com.katchup.common.category.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CategoryServiceTest {
    @Mock
    private CategoryRepository categoryRepository;
    @InjectMocks
    private CategoryService categoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("카테고리 생성 성공")
    void createCategory_success() {
        // given
        String name = "Technology";
        String code = "tech";
        Category category = Category.builder()
            .id(1L)
            .name(name)
            .code(code)
            .build();
            
        when(categoryRepository.save(any(Category.class))).thenReturn(category);

        // when
        var result = categoryService.create(name, code);

        // then
        assertThat(result.getName()).isEqualTo(name);
        assertThat(result.getCode()).isEqualTo(code);
        verify(categoryRepository, times(1)).save(any(Category.class));
    }

    @Test
    @DisplayName("ID로 카테고리 조회 성공")
    void findById_success() {
        // given
        Long categoryId = 1L;
        Category category = Category.builder()
            .id(categoryId)
            .name("Technology")
            .code("tech")
            .build();
            
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(category));

        // when
        var result = categoryService.findById(categoryId);

        // then
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(categoryId);
        assertThat(result.get().getName()).isEqualTo("Technology");
    }

    @Test
    @DisplayName("ID로 카테고리 조회 실패 - 카테고리 없음")
    void findById_notFound() {
        // given
        Long categoryId = 999L;
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());

        // when
        var result = categoryService.findById(categoryId);

        // then
        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("모든 카테고리 조회")
    void findAll_success() {
        // given
        Category category1 = Category.builder().id(1L).name("Technology").code("tech").build();
        Category category2 = Category.builder().id(2L).name("Science").code("sci").build();
        
        when(categoryRepository.findAll()).thenReturn(List.of(category1, category2));

        // when
        var result = categoryService.findAll();

        // then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("Technology");
        assertThat(result.get(1).getName()).isEqualTo("Science");
    }

    @Test
    @DisplayName("코드로 카테고리 조회 성공")
    void findByCode_success() {
        // given
        String code = "tech";
        Category category = Category.builder()
            .id(1L)
            .name("Technology")
            .code(code)
            .build();
            
        when(categoryRepository.findByCode(code)).thenReturn(Optional.of(category));

        // when
        var result = categoryService.findByCode(code);

        // then
        assertThat(result).isPresent();
        assertThat(result.get().getCode()).isEqualTo(code);
        assertThat(result.get().getName()).isEqualTo("Technology");
    }
} 