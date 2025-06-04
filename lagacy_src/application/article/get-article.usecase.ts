import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {IArticleRepository} from "@/domain/article/repositories/article.repository.interface";
import {ArticleDto} from "@/interfaces/dto/article.dto";
import {ArticleMapper} from "@/interfaces/mappers/article.mapper";
import {ARTICLE_REPOSITORY} from "@/infrastructure/persistence/persistence.module";


@Injectable()
export class GetArticleUseCase {
    constructor(
        @Inject(ARTICLE_REPOSITORY)
        private readonly repo: IArticleRepository
    ) {
    }

    async execute(id: number): Promise<ArticleDto> {
        const article = await this.repo.findById(id);
        if (!article) throw new NotFoundException(`Article with id ${id} not found`);
        return ArticleMapper.toDto(article);
    }
}
