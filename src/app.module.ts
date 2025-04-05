import {Module} from '@nestjs/common';
import {SchedulerModule} from './scheduler/rss-job/scheduler.module';
import {RssModule} from './collector/rss/rss.module';
import {LlmModule} from './llm/llm.module';
import {ArticleService} from './article/article.service';
import {PrismaService} from './shared/prisma.service';

@Module({
    imports: [SchedulerModule, RssModule, LlmModule, PrismaService],
    providers: [ArticleService, PrismaService],
})
export class AppModule {
}