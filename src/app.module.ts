import { Module } from '@nestjs/common';
import { SchedulerModule } from './scheduler/rss-job/scheduler.module';
import { RssModule } from './collector/rss/rss.module';

@Module({
  imports: [SchedulerModule, RssModule],
})
export class AppModule {}