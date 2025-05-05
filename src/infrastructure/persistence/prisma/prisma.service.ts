// src/infrastructure/persistence/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    // 모든 PrismaClient 프로퍼티가 이 인스턴스에 복사됩니다.
    [key: string]: any;

    constructor() {
        // CommonJS require 로 로드하면 TS export 이슈 무시 가능
        // @ts-ignore
        const { PrismaClient } = require('@prisma/client');
        const client = new PrismaClient();
        // client 안의 모든 메서드(모델, $connect 등)를 this 에 복사
        Object.assign(this, client);
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    /** 여러 쿼리를 하나의 트랜잭션으로 묶어 실행 */
    async runInTransaction<T>(fn: (prisma: any) => Promise<T>): Promise<T> {
        return this.$transaction(fn);
    }
}