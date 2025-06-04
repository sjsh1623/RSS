package com.katchup.api.category.repository;

import com.katchup.api.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
    Optional<Category> findByCode(String code);
} 