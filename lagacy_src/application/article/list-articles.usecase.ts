import {Inject, Injectable} from '@nestjs/common';
import {IArticleRepository} from "@/domain/article/repositories/article.repository.interface";
import {ArticleDto} from "@/interfaces/dto/article.dto";
import {ArticleMapper} from "@/interfaces/mappers/article.mapper";
import {ARTICLE_REPOSITORY} from "@/infrastructure/persistence/persistence.module";


@Injectable()
export class ListArticlesUseCase {
  constructor(
      @Inject(ARTICLE_REPOSITORY)
      private readonly repo: IArticleRepository
  ) {}

  async execute(categoryId?: number): Promise<ArticleDto[]> {
    const articles = categoryId ? await this.repo.findByCategory(categoryId) : await this.repo.findAll();
    return articles.map(ArticleMapper.toDto);
  }
}
