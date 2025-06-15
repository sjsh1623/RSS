package com.katchup.common.category.repository;

import com.katchup.common.category.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * 카테고리 레포지토리
 * 
 * 카테고리 엔티티의 데이터 접근을 담당하는 레포지토리입니다.
 * 카테고리 이름과 코드로 조회하는 기능을 제공합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {
    /**
     * 카테고리 이름으로 카테고리를 조회합니다.
     * 
     * @param name 카테고리 이름
     * @return 조회된 카테고리 (없을 경우 빈 Optional)
     */
    Optional<Category> findByName(String name);

    /**
     * 카테고리 코드로 카테고리를 조회합니다.
     * 
     * @param code 카테고리 코드
     * @return 조회된 카테고리 (없을 경우 빈 Optional)
     */
    Optional<Category> findByCode(String code);
} 