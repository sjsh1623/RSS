package com.katchup.common.rss.provider;

import com.katchup.common.rss.domain.RssSource;
import com.katchup.common.rss.model.FeedItem;
import java.util.List;

public interface FeedProvider {
    boolean supports(String providerType);
    List<FeedItem> fetch(RssSource config);
} 