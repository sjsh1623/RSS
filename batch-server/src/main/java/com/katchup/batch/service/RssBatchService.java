package com.katchup.batch.service;

import com.katchup.common.rss.domain.RssSource;
import com.katchup.common.rss.model.FeedItem;
import com.katchup.common.rss.provider.FeedProviderFactory;
import com.katchup.common.rss.repository.RssSourceRepository;
import com.katchup.common.article.domain.Article;
import com.katchup.common.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RssBatchService {
    private final RssSourceRepository rssSourceRepository;
    private final FeedProviderFactory feedProviderFactory;
    private final ArticleRepository articleRepository;
    private final EmbeddingClient embeddingClient;

    public void processRss() {
        List<RssSource> sources = rssSourceRepository.findAllActive();
        for (RssSource source : sources) {
            var provider = feedProviderFactory.getProvider(source.getProviderType());
            List<FeedItem> items = provider.fetch(source);
            for (FeedItem item : items) {
                List<Double> embedding = embeddingClient.getEmbedding(item.getContent());
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
                        .embedding(embedding)
                        .views(0)
                        .build();
                articleRepository.save(article);
            }
        }
    }
} 