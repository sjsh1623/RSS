package com.katchup.scheduler.service;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class EmbeddingClient implements EmbeddingService {
    private final WebClient webClient;

    public EmbeddingClient(@Value("${embedding.url:http://embedding:8000}") String baseUrl) {
        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
    }

    @Override
    public Optional<List<Double>> getEmbedding(String text) {
        try {
            Map<String, Object> response = webClient.post()
                    .uri("/embed")
                    .bodyValue(Map.of("text", text))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
            if (response == null || !response.containsKey("embedding")) {
                log.warn("No embedding found for text: {}", text);
                return Optional.empty();
            }
            return Optional.of((List<Double>) response.get("embedding"));
        } catch (Exception e) {
            log.error("Failed to get embedding for text: {}", text, e);
            return Optional.empty();
        }
    }
} 