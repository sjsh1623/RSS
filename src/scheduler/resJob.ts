import cron from 'node-cron';
import { RSSFetcher } from '@/collector/rss/rssFetcher';

type FeedSource = {
    source: string;
    url: string;
};

const feedQueue: FeedSource[] = [
    { source: '중앙일보', url: 'https://www.joongang.co.kr/rss' },
    { source: '연합뉴스', url: 'https://www.yna.co.kr/rss/news.xml' },
    { source: 'MBC', url: 'https://imnews.imbc.com/rss/news.xml' },
];

let currentIndex = 0;

/**
 * 매 30초마다 다음 RSS를 순차적으로 실행
 */
cron.schedule('*/30 * * * * *', async () => {
    const feed = feedQueue[currentIndex];
    console.log(`🛰️ [CRON] Fetching RSS: ${feed.source}`);

    const articles = await RSSFetcher.fetch(feed.url, feed.source);
    console.log(`📄 ${articles.length} articles fetched from ${feed.source}`);

    // 다음 인덱스 순환
    currentIndex = (currentIndex + 1) % feedQueue.length;
});