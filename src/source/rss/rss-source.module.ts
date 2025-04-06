// src/source/rss-source.module.ts

import { Module } from '@nestjs/common';
import { RssSourceService } from './rss-source.service';
import { RssSourceRepository } from './rss-source.repository';
import { PrismaService } from '@/shared/prisma.service';
import { RedisService } from '@/shared/redis.service';

@Module({
    providers: [RssSourceService, RssSourceRepository, PrismaService, RedisService],
    exports: [RssSourceService],
})
export class RssSourceModule {}