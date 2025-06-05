package com.katchup.batch.scheduler;

import com.katchup.scheduler.service.IRssBatchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RssScheduler {
    private final IRssBatchService rssBatchService;

    @EventListener(ApplicationReadyEvent.class)
    public void onStartup() {
        try {
            fetchAndSaveRss();
        } catch (Exception e) {
            log.error("Error on startup batch execution", e);
        }
    }

    @Scheduled(cron = "0 */30 * * * *") // 30분마다 실행
    public void fetchAndSaveRss() {
        try {
            rssBatchService.processRss();
        } catch (Exception e) {
            log.error("Error during scheduled batch execution", e);
        }
    }
} 