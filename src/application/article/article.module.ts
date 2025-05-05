// src/application/article/article.module.ts
import {Module} from '@nestjs/common';
import {PrismaModule} from '@/infrastructure/persistence/prisma/prisma.module';
import {RedisModule} from '@/shared/redis.module';
import {LlmModule} from '@/infrastructure/external/llm/llm.module';
import {EmbeddingModule} from '@/infrastructure/external/embedding/embedding.module';
import {SaveArticleUseCase} from './save-article.usecase';
import {GetArticleUseCase} from './get-article.usecase';
import {ListArticlesUseCase} from './list-articles.usecase';
import {SearchArticlesUseCase} from './search-articles.usecase';
import {ArticleController} from "@/interfaces/controllers/article.controller";
import {PersistenceModule} from "@/infrastructure/persistence/persistence.module";

@Module({
    imports: [PrismaModule, RedisModule, LlmModule, EmbeddingModule, PersistenceModule],
    controllers: [ArticleController],
    providers: [
        SaveArticleUseCase,
        GetArticleUseCase,
        ListArticlesUseCase,
        SearchArticlesUseCase,
    ],
    exports: [
        SaveArticleUseCase,
        GetArticleUseCase,
        ListArticlesUseCase,
        SearchArticlesUseCase,
    ],
})
export class ArticleModule {
}