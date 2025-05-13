import {Injectable} from '@nestjs/common';
import {PrismaService} from './prisma.service';
import {IArticleRepository} from '@/domain/article/repositories/article.repository.interface';
import {Article} from '@/domain/article/entities/article.entity';

@Injectable()
export class ArticleRepositoryImpl implements IArticleRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(article: Article): Promise<Article> {
        const result: any = await this.prisma.$queryRawUnsafe(
            `INSERT INTO article
             (url, urlHash, title, pubDate, source, category, language, shortSummary, longSummary, imageUrl, context,
              "createdAt", embedding)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`,
            article.url,
            article.urlHash,
            article.title,
            article.pubDate,
            article.providerId,
            article.categoryId,
            article.language,
            article.shortSummary,
            article.longSummary,
            article.imageUrl,
            article.context,
            article.createdAt,
            article.embedding,
        );
        const r = Array.isArray(result) ? result[0] : result;
        return new Article(
            r.id,
            r.url,
            r.urlHash,
            r.title,
            r.pubDate,
            r.source,
            r.categoryId,
            r.language,
            r.shortSummary,
            r.longSummary,
            r.imageUrl,
            r.context,
            r.createdAt,
            r.embedding,
        );
    }

    async findById(id: number): Promise<Article | null> {
        const r: any = await this.prisma.article.findUnique({where: {id}});
        if (!r) return null;
        return new Article(
            r.id,
            r.url,
            r.urlHash,
            r.title,
            r.pubDate,
            r.source,
            r.categoryId,
            r.language,
            r.shortSummary,
            r.longSummary,
            r.imageUrl,
            r.context,
            r.createdAt,
            r.embedding,
        );
    }

    async findAll(): Promise<Article[]> {
        const rs: any[] = await this.prisma.article.findMany();
        return rs.map(r => new Article(
            r.id,
            r.url,
            r.urlHash,
            r.title,
            r.pubDate,
            r.source,
            r.categoryId,
            r.language,
            r.shortSummary,
            r.longSummary,
            r.imageUrl,
            r.context,
            r.createdAt,
            r.embedding,
        ));
    }

    async findByCategory(category: string): Promise<Article[]> {
        const rs: any[] = await this.prisma.article.findMany({where: {category}});
        return rs.map(r => new Article(
            r.id,
            r.url,
            r.urlHash,
            r.title,
            r.pubDate,
            r.source,
            r.categoryId,
            r.language,
            r.shortSummary,
            r.longSummary,
            r.imageUrl,
            r.context,
            r.createdAt,
            r.embedding,
        ));
    }

    async searchByEmbedding(vector: number[], limit: number): Promise<Article[]> {
        // Convert vector to Postgres literal
        const vectorLiteral = '[' + vector.join(',') + ']';
        const result: any[] = await this.prisma.$queryRawUnsafe(
            `SELECT *
             FROM article
             ORDER BY embedding <=> $1::vector
                 LIMIT $2;`,
            vectorLiteral,
            limit,
        );
        return result.map(r => new Article(
            r.id,
            r.url,
            r.urlHash,
            r.title,
            r.pubDate,
            r.source,
            r.categoryId,
            r.language,
            r.shortSummary,
            r.longSummary,
            r.imageUrl,
            r.context,
            r.createdAt,
            r.embedding,
        ));
    }
}

