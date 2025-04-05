import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RssService } from '@/collector/rss/rss.service';
import { ArticleService } from '@/article/article.service';
import { rssFeedsMap } from '@/shared/constants/rss-feeds.constant';

@Injectable()
export class RssJobService {
    private readonly logger = new Logger(RssJobService.name);
    private readonly feedEntries = Object.entries(rssFeedsMap);
    private currentIndex = 0;

    constructor(
        private readonly rssService: RssService,
        private readonly articleService: ArticleService,
    ) {}

    @Cron('*/30 * * * * *') // 30초마다 실행
    async handleScheduledRss(): Promise<void> {
        const [url, meta] = this.feedEntries[this.currentIndex];
        this.logger.log(`🌐 [${meta.source}] ${meta.category} RSS 호출 시작`);

        const articles = await this.rssService.fetch(url, meta);

        let newCount = 0;
        for (const article of articles) {
            const saved = await this.articleService.saveIfNotExists({
                title: article.title,
                link: article.link,
                pubDate: article.pubDate ? new Date(article.pubDate) : new Date(),
                source: article.source,
                category: article.category,
                language: article.language,
                url,
                context: null,
            });

            if (saved) {
                newCount++;
                this.logger.log(`✅ 저장됨: ${article.title}`);
            } else {
                this.logger.warn(`⛔ 중복 데이터: ${article.title}`);
                break;
            }
        }

        this.logger.log(`📦 새로 저장된 기사 수: ${newCount}`);

        this.currentIndex = (this.currentIndex + 1) % this.feedEntries.length;
    }
}