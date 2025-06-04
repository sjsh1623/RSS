import {Inject, Injectable} from '@nestjs/common';
import {ICategoryRepository} from '@/domain/category/repositories/category.repository.interface';
import {CategoryDto} from '@/interfaces/dto/category.dto';
import {CategoryMapper} from '@/interfaces/mappers/category.mapper';
import {CATEGORY_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Injectable()
export class ListCategoriesUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        readonly repo: ICategoryRepository) {
    }

    async execute(): Promise<CategoryDto[]> {
        const categories = await this.repo.findAll();
        return categories.map(CategoryMapper.toDto);
    }
}
