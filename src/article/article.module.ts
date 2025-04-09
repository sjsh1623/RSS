import {Module} from '@nestjs/common';
import {ArticleService} from './article.service';
import {ArticleRepository} from './article.repository';
import {PrismaService} from '@/shared/prisma.service';
import {ExtractorUtil} from "@/utils/extractor.util";
import {LlmModule} from "@/llm/llm.module";
import {EmbeddingModule} from "@/embedding/embedding.module";

@Module({
    imports: [LlmModule, EmbeddingModule],
    providers: [ArticleService, ArticleRepository, PrismaService, ExtractorUtil],
    exports: [ArticleService], // 💡 외부 모듈에서 사용할 수 있게 export
})
export class ArticleModule {
}