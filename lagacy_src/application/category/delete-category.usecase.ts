import {Inject, Injectable} from '@nestjs/common';
import { ICategoryRepository } from '@/domain/category/repositories/category.repository.interface';
import {CATEGORY_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
      @Inject(CATEGORY_REPOSITORY)
      private readonly repo: ICategoryRepository
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
