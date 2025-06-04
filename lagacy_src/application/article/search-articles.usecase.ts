import {Injectable, Inject} from '@nestjs/common';
import {IArticleRepository} from '@/domain/article/repositories/article.repository.interface';
import {ArticleDto} from '@/interfaces/dto/article.dto';
import {ArticleMapper} from '@/interfaces/mappers/article.mapper';
import {EmbeddingService} from "@/infrastructure/external/embedding/embedding.service";
import {ARTICLE_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Injectable()
export class SearchArticlesUseCase {
    constructor(
        @Inject(ARTICLE_REPOSITORY)
        private readonly repo: IArticleRepository,
        private readonly EmbeddingService: EmbeddingService,
    ) {
    }

    async execute(query: string, limit = 10): Promise<ArticleDto[]> {
        // 1) create embedding via LLM interface
        const vector = await this.EmbeddingService.getEmbedding(query);
        // 2) perform similarity search
        const articles = await this.repo.searchByEmbedding(vector, limit);
        // 3) map to DTO
        return articles.map(ArticleMapper.toDto);
    }
}