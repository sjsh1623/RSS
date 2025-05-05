// src/infrastructure/adapters/scheduler/scheduler.module.ts

import {Module} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';

import {RssSchedulerAdapter} from './rss-scheduler.adapter';
import {CategorySchedulerAdapter} from './category-scheduler.adapter';
import {UpdateCategoriesUseCase} from '@/application/scheduler/update-categories.usecase';
import {ProcessRssUseCase} from '@/application/scheduler/process-rss.usecase';
import {RssFeedProvider} from '../../external/rss/rss-feed.provider';
import {BlogFeedProvider} from '../../external/blog/blog-feed.provider';
import {RedisModule} from '@/shared/redis.module';
import {LlmModule} from "../../external/llm/llm.module";
import {PersistenceModule} from "@/infrastructure/persistence/persistence.module";


@Module({
    imports: [
        ScheduleModule.forRoot(),
        PersistenceModule,
        RedisModule,
        LlmModule,
    ],
    providers: [
        // ① UseCase & Adapter
        ProcessRssUseCase,
        UpdateCategoriesUseCase,
        RssSchedulerAdapter,
        CategorySchedulerAdapter,

        // ② FeedProviders 묶기
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
export class SchedulerModule {
}