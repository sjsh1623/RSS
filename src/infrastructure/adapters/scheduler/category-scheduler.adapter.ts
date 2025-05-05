import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UpdateCategoriesUseCase } from '../../../application/scheduler/update-categories.usecase';

@Injectable()
export class CategorySchedulerAdapter {
  constructor(private readonly updateCategoriesUseCase: UpdateCategoriesUseCase) {}

  @Cron('*/10 * * * *')
  async handleCron() {
    await this.updateCategoriesUseCase.execute();
  }
}
