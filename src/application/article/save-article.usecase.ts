import {Inject, Injectable} from '@nestjs/common';
import {IArticleRepository} from "@/domain/article/repositories/article.repository.interface";
import {Article} from "@/domain/article/entities/article.entity";
import {ILlmService} from "@/domain/llm/services/llm-service.interface";
import {hashUrl} from "@/shared/utils/hash.util";
import {EmbeddingService} from "@/infrastructure/external/embedding/embedding.service";
import {ARTICLE_REPOSITORY} from "@/infrastructure/persistence/persistence.module";
import {LLM_SERVICE} from "@/infrastructure/external/llm/llm-service.token";


@Injectable()
export class SaveArticleUseCase {
    constructor(
        @Inject(ARTICLE_REPOSITORY)
        private readonly repo: IArticleRepository,
        @Inject(LLM_SERVICE)
        private readonly llmService: ILlmService,
        private readonly embeddingService: EmbeddingService,
    ) {
    }

    async execute(raw: {
        url: string;
        title: string;
        pubDate: Date;
        sourceTypeId: number;
        content: string;
        imageUrl: string;
        language: string;
    }): Promise<Article> {
        // 1) LLM으로 요약 및 카테고리 추출
        const {shortSummary, longSummary, category} = await this.llmService.analyze(raw.content);
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
            raw.sourceTypeId,
            category,
            raw.language,
            shortSummary,
            longSummary,
            raw.imageUrl,
            raw.content,
            new Date(),
            embedding,
        );
        // 5) 저장
        return this.repo.create(article);
    }
}
