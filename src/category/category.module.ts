import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '@/shared/prisma.service';
import { RedisService } from '@/shared/redis.service';

@Module({
    providers: [CategoryService, PrismaService, RedisService],
    controllers: [CategoryController],
    exports: [CategoryService],
})
export class CategoryModule {}