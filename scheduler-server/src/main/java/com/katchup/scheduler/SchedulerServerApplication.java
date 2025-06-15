package com.katchup.scheduler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * 스케줄러 서버 애플리케이션
 * 
 * RSS 피드를 주기적으로 수집하고 처리하는 스케줄러 서버의 메인 애플리케이션입니다.
 * 스케줄링 기능을 활성화하여 정기적인 작업을 수행합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@SpringBootApplication
@EnableScheduling
public class SchedulerServerApplication {
    /**
     * 애플리케이션 메인 메서드
     * 
     * @param args 커맨드 라인 인자
     */
    public static void main(String[] args) {
        SpringApplication.run(SchedulerServerApplication.class, args);
    }
} 