import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RssService } from '@/collector/rss/rss.service';
import { rssFeedsMap } from '@/shared/constants/rss-feeds.constant';

@Injectable()
export class RssJobService {
    private readonly logger = new Logger(RssJobService.name);
    private readonly feedEntries = Object.entries(rssFeedsMap); // [url, {meta}]
    private currentIndex = 0;

    constructor(private readonly rssService: RssService) {}

    @Cron('*/30 * * * * *') // 30초마다 실행
    async handleScheduledRss() {
        const [url, meta] = this.feedEntries[this.currentIndex];
        this.logger.log(`🌀 [${meta.source}] ${meta.category} RSS 호출 시작`);

        const articles = await this.rssService.fetch(url, meta);

        if (articles.length > 0) {
            this.logger.log(`✅ ${articles.length}개 기사 수집됨`);
            articles.slice(0, 3).forEach((article, i) => {
                console.log(`📌 [${article.category}] ${article.title}`);
                console.log(`    🕒 ${article.pubDate}`);
                console.log(`    🔗 ${article.link}`);
                console.log(`    📰 ${article.source} (${article.language})\n`);
            });
        } else {
            this.logger.warn(`⚠️ 기사 없음: ${meta.source} (${meta.category})`);
        }

        this.currentIndex = (this.currentIndex + 1) % this.feedEntries.length;
    }
}