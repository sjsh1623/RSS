import { Injectable } from '@nestjs/common';
import { RedisService } from '@/shared/redis.service';
import {ITokenRepository} from "@/domain/auth/repositories/token.repository.interface";

@Injectable()
export class TokenRepositoryImpl implements ITokenRepository {
    constructor(private readonly redisService: RedisService) {}

    private key(email: string): string {
        return `auth:refresh:${email}`;
    }

    /** 이메일에 대한 리프레시 토큰을 Redis에 저장(만료시간 TTL 적용) */
    async save(email: string, token: string, expiresAt: Date): Promise<void> {
        const ttl = Math.max(
            Math.floor((expiresAt.getTime() - Date.now()) / 1000),
            0,
        );
        await this.redisService.set(this.key(email), token, ttl);
    }

    /** 저장된 리프레시 토큰 조회 */
    async find(email: string): Promise<string | null> {
        return this.redisService.get(this.key(email));
    }

    /** 리프레시 토큰 삭제 */
    async remove(email: string): Promise<void> {
        await this.redisService.del(this.key(email));
    }
}