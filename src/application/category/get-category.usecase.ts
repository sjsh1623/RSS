import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import { ICategoryRepository } from '@/domain/category/repositories/category.repository.interface';
import { CategoryDto } from '@/interfaces/dto/category.dto';
import { CategoryMapper } from '@/interfaces/mappers/category.mapper';
import {CATEGORY_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Injectable()
export class GetCategoryUseCase {
  constructor(
      @Inject(CATEGORY_REPOSITORY)
      private readonly repo: ICategoryRepository
  ) {}

  async execute(id: number): Promise<CategoryDto> {
    const category = await this.repo.findById(id);
    if (!category) throw new NotFoundException(`Category with id \${id} not found`);
    return CategoryMapper.toDto(category);
  }
}
