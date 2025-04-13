// src/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma.service';
import { RedisService } from '@/shared/redis.service';

@Injectable()
export class CategoryService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly redisService: RedisService,
    ) {}

    async updateCategoryCache() {
        const categories = await this.prisma.category.findMany({
            where: { is_active: true },
            include: { subcategory: { where: { is_active: true } } },
        });

        await this.redisService.set('category:all', categories);
    }

    async getCategoriesFromCache() {
        return await this.redisService.get('category:all');
    }
}