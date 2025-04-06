import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RssService } from '@/collector/rss/rss.service';
import { ArticleService } from '@/article/article.service';
import { RedisService } from '@/shared/redis.service';

@Injectable()
export class RssJobService implements OnModuleInit {
    private readonly logger = new Logger(RssJobService.name);
    private feedEntries: [string, { source: string; category: string; language: string }][] = [];
    private currentIndex = 0;

    constructor(
        private readonly rssService: RssService,
        private readonly articleService: ArticleService,
        private readonly redisService: RedisService,
    ) {}

    async onModuleInit() {
        const feeds = await this.redisService.get('rss:sources');
        if (!feeds) {
            this.logger.warn('🚨 Redis에서 RSS Source 정보를 불러오지 못했습니다.');
            return;
        }

        this.feedEntries = Object.entries(feeds);
        this.logger.log(`🔁 RSS 소스 ${this.feedEntries.length}개 로드 완료`);
    }

    @Cron('*/10 * * * * *') // 10초마다 실행
    async handleScheduledRss(): Promise<void> {
        if (this.feedEntries.length === 0) {
            this.logger.warn('⚠️ RSS 소스가 없습니다. Redis 초기화를 확인하세요.');
            return;
        }

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