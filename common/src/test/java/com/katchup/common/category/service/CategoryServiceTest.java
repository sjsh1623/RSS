package com.katchup.common.category.service;

import com.katchup.common.category.domain.Category;
import com.katchup.common.category.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

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
    void createCategory() {
        Category category = Category.builder().id(1L).name("cat").code("code").build();
        when(categoryRepository.save(any(Category.class))).thenReturn(category);
        var result = categoryService.create("cat", "code");
        assertThat(result.getName()).isEqualTo("cat");
        assertThat(result.getCode()).isEqualTo("code");
    }

    @Test
    void findById() {
        Category category = Category.builder().id(1L).name("cat").code("code").build();
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        var result = categoryService.findById(1L);
        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo("cat");
    }
} 