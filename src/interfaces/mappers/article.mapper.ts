import { Article } from '@/domain/article/entities/article.entity';
import { ArticleDto } from '../dto/article.dto';

export class ArticleMapper {
  static toDto(article: Article): ArticleDto {
    const dto = new ArticleDto();
    dto.id = article.id;
    dto.url = article.url;
    dto.title = article.title;
    dto.pubDate = article.pubDate;
    dto.providerId = article.providerId;
    dto.categoryId = article.categoryId;
    dto.language = article.language;
    dto.shortSummary = article.shortSummary;
    dto.longSummary = article.longSummary;
    dto.imageUrl = article.imageUrl;
    dto.context = article.context;
    dto.createdAt = article.createdAt;
    dto.embedding = article.embedding;
    return dto;
  }
}
