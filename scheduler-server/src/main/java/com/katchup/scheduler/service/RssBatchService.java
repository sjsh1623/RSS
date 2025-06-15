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

/**
 * RSS 피드 배치 처리 서비스
 * 
 * RSS 피드를 주기적으로 가져와서 Article로 변환하여 저장하는 서비스입니다.
 * 각 RSS 소스별로 피드를 가져와서 처리하며, 임베딩 서비스를 통해 콘텐츠의 벡터 표현을 생성합니다.
 * 
 * @author katchup
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RssBatchService implements IRssBatchService {
    private final RssSourceRepository rssSourceRepository;
    private final FeedProviderFactory feedProviderFactory;
    private final ArticleRepository articleRepository;
    private final EmbeddingService embeddingService;

    /**
     * RSS 피드 처리 메인 메서드
     * 
     * 활성화된 모든 RSS 소스에 대해:
     * 1. 해당 소스의 피드 제공자를 가져옴
     * 2. 피드 아이템들을 가져옴
     * 3. 각 아이템에 대해:
     *    - 임베딩 생성
     *    - Article 엔티티로 변환
     *    - 데이터베이스에 저장
     * 
     * @throws RuntimeException 피드 처리 중 발생하는 예외를 상위로 전파
     */
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
                        Article article = new Article(
                            null,  // id
                            item.getTitle(),
                            item.getUrl(),
                            Integer.toHexString(item.getUrl().hashCode()),
                            LocalDateTime.parse(item.getPubDate()),
                            source.getProviderId(),
                            source.getCategoryId(),
                            source.getLanguage(),
                            item.getShortSummary(),
                            item.getLongSummary(),
                            item.getImageUrl(),
                            item.getContext(),
                            LocalDateTime.now(),
                            embeddingOpt.get(),
                            0  // views
                        );
                        articleRepository.save(article);
                    } catch (Exception e) {
                        log.error("Failed to process FeedItem: {}", item.getUrl(), e);
                    }
                }
            } catch (Exception e) {
                log.error("Failed to process RSS source: {}", source.getUrl(), e);
            }
        }
    }
} 