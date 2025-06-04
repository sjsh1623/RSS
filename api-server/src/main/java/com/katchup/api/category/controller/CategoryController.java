package com.katchup.api.category.controller;

import com.katchup.api.category.dto.CategoryDto;
import com.katchup.api.category.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> getById(@PathVariable Long id) {
        return categoryService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<CategoryDto> getByName(@PathVariable String name) {
        return categoryService.findByName(name)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CategoryDto> create(@RequestParam String name, @RequestParam String code) {
        return ResponseEntity.ok(categoryService.create(name, code));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDto> update(@PathVariable Long id, @RequestParam String name, @RequestParam String code) {
        return ResponseEntity.ok(categoryService.update(id, name, code));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
} 