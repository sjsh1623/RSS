import {Inject, Injectable} from '@nestjs/common';
import { ICategoryRepository } from '@/domain/category/repositories/category.repository.interface';
import { CategoryDto } from '@/interfaces/dto/category.dto';
import { CategoryMapper } from '@/interfaces/mappers/category.mapper';
import {CATEGORY_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
      @Inject(CATEGORY_REPOSITORY)
      private readonly repo: ICategoryRepository
  ) {}

  async execute(id: number, name: string, code: string): Promise<CategoryDto> {
    const category = await this.repo.update(id, name, code);
    return CategoryMapper.toDto(category);
  }
}
