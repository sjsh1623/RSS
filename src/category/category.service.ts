import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async findActiveCategories(): Promise<CategoryResponseDto[]> {
        const categories = await this.categoryRepository.findAllActiveCategoriesWithSubcategories();

        return categories.map((category) => ({
            id: category.id,
            name: category.name,
            code: category.code,
        }));
    }
}