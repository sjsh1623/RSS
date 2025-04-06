import { Module } from '@nestjs/common';
import { RssJobService } from './rss-job/rss-job.service';
import { RssService } from '@/collector/rss/rss.service';
import { ArticleModule } from '@/article/article.module';
import { RssSourceModule } from '@/source/rss/rss-source.module';

@Module({
  imports: [ArticleModule, RssSourceModule],
  providers: [RssJobService, RssService],
})
export class SchedulerModule {}