import {Inject, Injectable} from '@nestjs/common';
import {IArticleRepository} from "@/domain/article/repositories/article.repository.interface";
import {Article} from "@/domain/article/entities/article.entity";
import {ILlmService} from "@/domain/llm/services/llm-service.interface";
import {hashUrl} from "@/shared/utils/hash.util";
import {EmbeddingService} from "@/infrastructure/external/embedding/embedding.service";
import {ARTICLE_REPOSITORY, CATEGORY_REPOSITORY} from "@/infrastructure/persistence/persistence.module";
import {LLM_SERVICE} from "@/infrastructure/external/llm/llm-service.token";
import {ICategoryRepository} from "@/domain/category/repositories/category.repository.interface";


@Injectable()
export class SaveArticleUseCase {
    constructor(
        @Inject(ARTICLE_REPOSITORY)
        private readonly articleRepo: IArticleRepository,

        @Inject(LLM_SERVICE)
        private readonly llmService: ILlmService,

        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepo: ICategoryRepository,

        private readonly embeddingService: EmbeddingService,
    ) {}

    async execute(raw: {
        url: string;
        title: string;
        pubDate: Date;
        providerId: number;
        content: string;
        imageUrl: string;
        language: string;
    }): Promise<Article> {
        // 1) LLM으로 요약 및 카테고리 추출
        const {shortSummary, longSummary, category} = await this.llmService.analyze(raw.content);
        // 1.5) Category 조회
        const categoryId = await this.categoryRepo.findByName(category).then(c => c?.id);
        if (!categoryId) throw new Error(`Category ${category} not found`);
        // 2) URL 해시화
        const urlHash = hashUrl(raw.url);
        // 3) 임베딩 생성
        const embedding = await this.embeddingService.getEmbedding(raw.content);
        // 4) 도메인 엔티티 생성
        const article = new Article(
            0,
            raw.url,
            urlHash,
            raw.title,
            raw.pubDate,
            raw.providerId,
            categoryId,
            raw.language,
            shortSummary,
            longSummary,
            raw.imageUrl,
            raw.content,
            new Date(),
            embedding,
        );
        // 5) 저장
        return this.articleRepo.create(article);
    }
}
