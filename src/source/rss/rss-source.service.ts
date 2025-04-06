import { Injectable, OnModuleInit } from '@nestjs/common';
import { RssSourceRepository } from './rss-source.repository';
import { RedisService } from '@/shared/redis.service';

@Injectable()
export class RssSourceService implements OnModuleInit {
    constructor(
        private readonly repo: RssSourceRepository,
        private readonly redisService: RedisService,
    ) {}

    private readonly CACHE_KEY = 'rss_sources';

    async onModuleInit() {
        await this.cacheSources(); // 앱 시작 시 캐시
    }

    async cacheSources() {
        const sources = await this.repo.findAllActive();
        console.log(sources)
        await this.redisService.set(this.CACHE_KEY, sources);
    }

    async getSourcesFromCache() {
        const cached = await this.redisService.get(this.CACHE_KEY);
        if (!cached) {
            await this.cacheSources();
            return this.redisService.get(this.CACHE_KEY);
        }
        return cached;
    }
}