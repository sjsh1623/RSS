import { Module } from '@nestjs/common';
import { RssJobService } from './rss-job/rss-job.service';
import { RssService } from '@/collector/rss/rss.service';
import { ArticleModule } from '@/article/article.module';
import { RssSourceModule } from '@/source/rss/rss-source.module';
import {CategoryJobService} from "@/scheduler/category-job/category-job.service";
import {CategoryModule} from "@/category/category.module";

@Module({
  imports: [ArticleModule, RssSourceModule, CategoryModule],
  providers: [RssJobService, RssService, CategoryJobService],
})
export class SchedulerModule {}