import { Article } from '../entities/article.entity';

export interface IArticleRepository {
  create(article: Article): Promise<Article>;
  findById(id: number): Promise<Article | null>;
  findAll(): Promise<Article[]>;
  findByCategory(categoryId: number): Promise<Article[]>;
  searchByEmbedding(vector: number[], limit: number): Promise<Article[]>;
}
