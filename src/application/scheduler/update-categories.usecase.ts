import { Injectable, Logger } from '@nestjs/common';
import { ListCategoriesUseCase } from '../../application/category/list-categories.usecase';
import { RedisService } from '../../shared/redis.service';

@Injectable()
export class UpdateCategoriesUseCase {
  private readonly logger = new Logger(UpdateCategoriesUseCase.name);

  constructor(
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly redisService: RedisService,
  ) {}

  async execute(): Promise<void> {
    this.logger.debug('Executing UpdateCategoriesUseCase');
    const categories = await this.listCategoriesUseCase.execute();
    await this.redisService.set('categories', JSON.stringify(categories));
    this.logger.log(`Updated ${categories.length} categories in Redis`);
  }
}
