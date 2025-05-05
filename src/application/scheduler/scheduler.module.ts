// src/infrastructure/adapters/scheduler/scheduler.module.ts

import {Module} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';
import {PersistenceModule} from "@/infrastructure/persistence/persistence.module";
import {RedisModule} from "@/shared/redis.module";
import {LlmModule} from "@/infrastructure/external/llm/llm.module";
import {ArticleModule} from "@/application/article/article.module";
import {ProcessRssUseCase} from "@/application/scheduler/process-rss.usecase";
import {UpdateCategoriesUseCase} from "@/application/scheduler/update-categories.usecase";
import {RssSchedulerAdapter} from "@/infrastructure/adapters/scheduler/rss-scheduler.adapter";
import {CategorySchedulerAdapter} from "@/infrastructure/adapters/scheduler/category-scheduler.adapter";
import {BlogFeedProvider} from "@/infrastructure/external/blog/blog-feed.provider";
import {RssFeedProvider} from "@/infrastructure/external/rss/rss-feed.provider";
import {SaveArticleUseCase} from "@/application/article/save-article.usecase";


@Module({
    imports: [
        ScheduleModule.forRoot(),
        PersistenceModule,  // IReadRssSourceRepository 제공
        RedisModule,        // RedisService 제공
        LlmModule,          // ILlmService 제공
        ArticleModule,
    ],
    providers: [
        ProcessRssUseCase,
        UpdateCategoriesUseCase,
        RssSchedulerAdapter,
        CategorySchedulerAdapter,
        RssFeedProvider,
        BlogFeedProvider,
        {
            provide: 'FEED_PROVIDERS',
            useFactory: (rss: RssFeedProvider, blog: BlogFeedProvider) => [rss, blog],
            inject: [RssFeedProvider, BlogFeedProvider],
        },
    ],
    exports: [ProcessRssUseCase, UpdateCategoriesUseCase],
})
export class SchedulerModule {}