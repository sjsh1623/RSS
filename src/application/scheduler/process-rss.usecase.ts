import {Injectable, Logger, Inject} from '@nestjs/common';
import {RedisService} from '@/shared/redis.service';
import {IReadRssSourceRepository} from '@/domain/rss/repositories/rss-source.repository.interface';
import {FeedProvider} from '@/domain/integration/feed-provider.gateway';
import {FeedConfig} from "@/domain/integration/feed-config.interface";
import {FeedItem} from "@/domain/integration/feed-item.interface";
import {RSS_SOURCE_REPOSITORY} from "@/infrastructure/persistence/persistence.module";
import {SaveArticleUseCase} from "@/application/article/save-article.usecase";

@Injectable()
export class ProcessRssUseCase {
    private readonly logger = new Logger(ProcessRssUseCase.name);

    constructor(
        @Inject(RSS_SOURCE_REPOSITORY)
        private readonly rssRepo: IReadRssSourceRepository,
        private readonly saveArticleUseCase: SaveArticleUseCase,
        private readonly redisService: RedisService,
        @Inject('FEED_PROVIDERS')
        private readonly feedProviders: FeedProvider[],
    ) {
    }

    /** 전체 플로우 진입점 */
    async execute(): Promise<void> {
        this.logger.debug('Starting RSS processing');

        const configs = await this.rssRepo.findAllActive();
        if (configs.length === 0) {
            this.logger.warn('No active RSS configurations found');
            return;
        }

        await this.cacheConfigs(configs);
        const feedConfigs = await this.getCachedConfigs();

        for (const config of feedConfigs) {
            await this.handleConfig(config);
        }

        this.logger.log('RSS processing completed');
    }

    /** DB → Redis 캐싱 */
    private async cacheConfigs(configs: FeedConfig[]): Promise<void> {
        await this.redisService.set('rssConfigs', JSON.stringify(configs));
    }

    /** Redis → 파싱된 설정 로드 */
    private async getCachedConfigs(): Promise<FeedConfig[]> {
        const raw = await this.redisService.get('rssConfigs');
        if (!raw) {
            this.logger.warn('No RSS configs in cache');
            return [];
        }

        try {
            return JSON.parse(raw) as FeedConfig[];
        } catch (err) {
            this.logger.error('Failed to parse cached RSS configs', err);
            return [];
        }
    }


    private async handleConfig(config: FeedConfig): Promise<void> {
        const provider = this.feedProviders.find(p => p.supports(config.providerType));
        if (!provider) {
            this.logger.warn(`No provider for feed type: ${config.providerName}`);
            return;
        }

        let items: FeedItem[];
        try {
            items = await provider.fetch(config);
        } catch (err) {
            this.logger.error(`Fetch failed for ${config.url}`, err.stack || err);
            return;
        }

        await this.persistItems(items);
    }

    /** 가져온 아이템을 Article로 저장 */
    private async persistItems(items: FeedItem[]): Promise<void> {
        for (const item of items) {
            try {
                await this.saveArticleUseCase.execute({
                    url: item.url,
                    title: item.title,
                    pubDate: new Date(item.pubDate),
                    providerId : item.providerId,
                    content: item.content,
                    imageUrl: item.imageUrl,
                    language: item.language,
                });
            } catch (err) {
                this.logger.error(`Saving article failed for ${item.url}`, err.stack || err);
            }
        }
    }
}