package com.katchup.common.rss.provider;

import com.katchup.common.rss.domain.RssSource;
import com.katchup.common.rss.model.FeedItem;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class SimpleFeedProvider implements FeedProvider {
    @Override
    public boolean supports(String providerType) {
        // providerType이 "rss"일 때만 지원 (예시)
        return "rss".equalsIgnoreCase(providerType);
    }

    @Override
    public List<FeedItem> fetch(RssSource config) {
        List<FeedItem> items = new ArrayList<>();
        try {
            Document doc = Jsoup.connect(config.getUrl()).get();
            Elements entries = doc.select("item");
            for (Element entry : entries) {
                String url = entry.selectFirst("link") != null ? entry.selectFirst("link").text() : "";
                String title = entry.selectFirst("title") != null ? entry.selectFirst("title").text() : "";
                String pubDate = entry.selectFirst("pubDate") != null ? entry.selectFirst("pubDate").text() : "";
                String content = entry.selectFirst("description") != null ? entry.selectFirst("description").text() : "";
                String imageUrl = entry.selectFirst("enclosure[url]") != null ? entry.selectFirst("enclosure").attr("url") : "";
                items.add(new FeedItem(
                        url,
                        title,
                        pubDate,
                        config.getProviderId(),
                        config.getProviderName(),
                        config.getProviderType(),
                        content,
                        imageUrl,
                        config.getLanguage()
                ));
            }
        } catch (Exception e) {
            log.error("RSS 파싱 실패: {}", config.getUrl(), e);
        }
        return items;
    }
} 