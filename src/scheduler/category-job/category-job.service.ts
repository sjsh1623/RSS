// src/scheduler/category-job/category-job.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CategoryService } from '@/category/category.service';

@Injectable()
export class CategoryJobService {
    constructor(private readonly categoryService: CategoryService) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCategoryCacheUpdate() {
        await this.categoryService.updateCategoryCache();
    }
}