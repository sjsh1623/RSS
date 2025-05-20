import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepositoryImpl }         from '@/infrastructure/persistence/prisma/article.repository.impl';

@Injectable()
export class IncrementArticleViewsUseCase {
    constructor(private readonly repo: ArticleRepositoryImpl) {}

    /**
     * 글 조회 → 조회 수 증가 → 증가된 조회 수 반환
     */
    async execute(articleId: number): Promise<number> {
        // 1) 존재 확인
        const article = await this.repo.findById(articleId);
        if (!article) {
            throw new NotFoundException(`Article ${articleId} not found`);
        }

        // 2) 조회 수 1 증가
        await this.repo.incrementViews(articleId);

        // 3) 늘어난 조회 수 리턴 (optional: 다시 조회하거나 article.views+1)
        return article.views + 1;
    }
}