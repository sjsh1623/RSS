import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RssService } from '@/collector/rss/rss.service';
import { ArticleService } from '@/article/article.service';
import { RssSourceService } from '@/source/rss/rss-source.service';

@Injectable()
export class RssJobService implements OnModuleInit {
    private readonly logger = new Logger(RssJobService.name);
    private feedEntries: { url: string; source: string; category: string; language: string }[] = [];
    private currentIndex = 0;

    constructor(
        private readonly rssService: RssService,
        private readonly articleService: ArticleService,
        private readonly rssSourceService: RssSourceService,
    ) {}

    async onModuleInit() {
        const feeds = await this.rssSourceService.getSourcesFromCache();
        if (!feeds || feeds.length === 0) {
            this.logger.warn('🚨 Redis에 RSS Source 데이터가 없습니다.');
            return;
        }

        this.feedEntries = feeds.map(feed => ({
            url: feed.url,
            source: feed.source,
            language: feed.language,
        }));

        this.logger.log(`📥 RSS Source ${this.feedEntries.length}개 캐시 로드 완료`);
    }

    @Cron('*/30 * * * * *') // 10초마다 실행
    async handleScheduledRss(): Promise<void> {
        if (this.feedEntries.length === 0) {
            this.logger.warn('⚠️ RSS 소스가 없습니다. 캐시를 확인해주세요.');
            return;
        }

        const { url, source, language } = this.feedEntries[this.currentIndex];
        this.logger.log(`🌐 [${source}] } RSS 호출 시작`);

        const articles = await this.rssService.fetch(url, { source, language });

        let newCount = 0;
        for (const article of articles) {
            const saved = await this.articleService.saveIfNotExists({
                title: article.title,
                link: article.link,
                pubDate: article.pubDate ? new Date(article.pubDate) : new Date(),
                source: article.source,
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