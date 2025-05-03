import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResponseDto } from './dto/category-response.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getActiveCategories(): Promise<CategoryResponseDto[]> {
        return this.categoryService.findActiveCategories();
    }
}