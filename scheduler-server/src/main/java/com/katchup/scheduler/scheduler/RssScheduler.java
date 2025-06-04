package com.katchup.batch.scheduler;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RssScheduler {
    // private final ArticleService articleService; // 실제 서비스 주입

    @EventListener(ApplicationReadyEvent.class)
    public void onStartup() {
        fetchAndSaveRss();
    }

    @Scheduled(cron = "0 */30 * * * *") // 30분마다 실행
    public void fetchAndSaveRss() {
        // TODO: RSS 수집 및 DB 저장 로직
        System.out.println("RSS 수집 및 저장 실행!");
    }
} 