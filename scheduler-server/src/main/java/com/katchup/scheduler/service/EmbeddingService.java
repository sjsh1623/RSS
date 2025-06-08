package com.katchup.scheduler.service;

import java.util.Optional;
import java.util.List;

public interface EmbeddingService {
    Optional<List<Double>> getEmbedding(String text);
} 