import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
    private client = createClient({ url: process.env.REDIS_URL_RSS });

    async onModuleInit() {
        await this.client.connect();
    }

    async set(key: string, value: any) {
        await this.client.set(key, JSON.stringify(value));
    }

    async get(key: string) {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }
}