// src/infrastructure/persistence/prisma/prisma.service.ts
import {Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'], // ✅ 로그 보기 설정
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async runInTransaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
        return this.$transaction(fn);
    }
}