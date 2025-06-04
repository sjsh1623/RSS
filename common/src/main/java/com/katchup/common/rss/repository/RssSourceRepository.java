package com.katchup.common.rss.repository;

import com.katchup.common.rss.domain.RssSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface RssSourceRepository extends JpaRepository<RssSource, Long> {
    @Query("SELECT r FROM RssSource r WHERE r.url IS NOT NULL")
    List<RssSource> findAllActive();
} 