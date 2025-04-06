import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule'; // ✅ 이거 꼭 필요
import { SchedulerModule } from './scheduler/scheduler.module';
import { RssModule } from './collector/rss/rss.module';
import { ArticleModule } from './article/article.module';

@Module({
    imports: [
        ScheduleModule.forRoot(), // ✅ 반드시 루트 모듈에서 호출 필요
        SchedulerModule,
        RssModule,
        ArticleModule,
    ],
})
export class AppModule {}