import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: RedisClientType;

    async onModuleInit() {
        this.client = createClient({url: process.env.REDIS_URL_RSS});
        this.client.on('error', (err) => console.error('Redis Client Error', err));
        await this.client.connect();
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    /** 문자열 값 반환 (없으면 null) */
    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    /** TTL(초) 옵션이 있을 경우 만료시간 설정 */
    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        if (ttlSeconds && ttlSeconds > 0) {
            await this.client.set(key, value, {
                EX: ttlSeconds,
            });
        } else {
            await this.client.set(key, value);
        }
    }

    /** 키 삭제 */
    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}