import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RssJobService } from './rss-job.service';
import { RssModule } from '@/collector/rss/rss.module';

@Module({
  imports: [ScheduleModule.forRoot(), RssModule],
  providers: [RssJobService],
})
export class SchedulerModule {}