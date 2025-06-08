package com.katchup.scheduler.service;

import com.katchup.common.rss.domain.RssSource;
import com.katchup.common.rss.model.FeedItem;
import com.katchup.common.rss.provider.FeedProviderFactory;
import com.katchup.common.rss.repository.RssSourceRepository;
import com.katchup.common.article.domain.Article;
import com.katchup.common.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RssBatchService implements IRssBatchService {
    private final RssSourceRepository rssSourceRepository;
    private final FeedProviderFactory feedProviderFactory;
    private final ArticleRepository articleRepository;
    private final EmbeddingService embeddingService;

    @Override
    public void processRss() {
        List<RssSource> sources = rssSourceRepository.findAllActive();
        for (RssSource source : sources) {
            try {
                var provider = feedProviderFactory.getProvider(source.getProviderType());
                List<FeedItem> items = provider.fetch(source);
                for (FeedItem item : items) {
                    try {
                        var embeddingOpt = embeddingService.getEmbedding(item.getContent());
                        if (embeddingOpt.isEmpty()) {
                            log.warn("Embedding not found for item: {}", item.getUrl());
                            continue;
                        }
                        Article article = Article.builder()
                                .url(item.getUrl())
                                .urlHash(Integer.toHexString(item.getUrl().hashCode()))
                                .title(item.getTitle())
                                .pubDate(LocalDateTime.parse(item.getPubDate()))
                                .providerId(item.getProviderId())
                                .categoryId(null)
                                .language(item.getLanguage())
                                .shortSummary("")
                                .longSummary("")
                                .imageUrl(item.getImageUrl())
                                .context(item.getContent())
                                .createdAt(LocalDateTime.now())
                                .embedding(embeddingOpt.get())
                                .views(0)
                                .build();
                        articleRepository.save(article);
                    } catch (Exception e) {
                        log.error("Failed to process FeedItem: {}", item.getUrl(), e);
                    }
                }
            } catch (Exception e) {
                log.error("Failed to process RssSource: {}", source.getUrl(), e);
            }
        }
    }
} 