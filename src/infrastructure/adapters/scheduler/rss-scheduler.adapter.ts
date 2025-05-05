import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProcessRssUseCase } from '../../../application/scheduler/process-rss.usecase';

@Injectable()
export class RssSchedulerAdapter {
  constructor(private readonly processRssUseCase: ProcessRssUseCase) {}

  @Cron('*/3 * * * *')
  async handleCron() {
    await this.processRssUseCase.execute();
  }
}
