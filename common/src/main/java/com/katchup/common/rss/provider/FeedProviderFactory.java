package com.katchup.common.rss.provider;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FeedProviderFactory {
    private final List<FeedProvider> providers;

    public FeedProvider getProvider(String providerType) {
        return providers.stream()
                .filter(p -> p.supports(providerType))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No provider for type: " + providerType));
    }
} 