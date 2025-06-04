package com.katchup.batch.service;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import java.util.List;
import java.util.Map;

@Component
public class EmbeddingClient {
    private final WebClient webClient;

    public EmbeddingClient(@Value("${embedding.url:http://embedding:8000}") String baseUrl) {
        this.webClient = WebClient.builder().baseUrl(baseUrl).build();
    }

    public List<Double> getEmbedding(String text) {
        Map<String, Object> response = webClient.post()
                .uri("/embed")
                .bodyValue(Map.of("text", text))
                .retrieve()
                .bodyToMono(Map.class)
                .block();
        return (List<Double>) response.get("embedding");
    }
} 