import { Inject, Injectable } from '@nestjs/common';
import { IArticleRepository } from '@/domain/article/repositories/article.repository.interface';
import { ARTICLE_REPOSITORY } from '@/infrastructure/persistence/persistence.module';
import { ArticleDto } from '@/interfaces/dto/article.dto';
import { ArticleMapper } from '@/interfaces/mappers/article.mapper';

@Injectable()
export class GetTrendingArticlesByCategoryUseCase {
    constructor(
        @Inject(ARTICLE_REPOSITORY)
        private readonly repo: IArticleRepository,
    ) {}

    async execute(categoryId: number, limit = 10): Promise<ArticleDto[]> {
        const articles = await this.repo.findTopByViewsByCategory(categoryId, limit);
        return articles.map(ArticleMapper.toDto);
    }
}