import {Injectable} from '@nestjs/common';
import {createClient} from 'redis';

@Injectable()
export class RedisService {
    private client = createClient({url: process.env.REDIS_URL_RSS});

    async onModuleInit() {
        await this.client.connect();
    }

    async set(key: string, value: any, ttlInSec?: number): Promise<void> {
        if (ttlInSec) {
            await this.client.set(key, JSON.stringify(value), {
                EX: ttlInSec,
            });
        } else {
            await this.client.set(key, JSON.stringify(value));
        }
    }

    async get(key: string) {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async delete(key: string): Promise<void> {
        await this.client.del(key); // ✅ 여기!
    }
}