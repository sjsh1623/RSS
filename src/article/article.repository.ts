import {PrismaService} from '@/shared/prisma.service';
import {Injectable} from '@nestjs/common';
import {article} from '@prisma/client';
import {CreateArticleDto} from './dto/create-article.dto';

@Injectable()
export class ArticleRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async findByHash(urlHash: string): Promise<article | null> {
        return this.prisma.article.findUnique({
            where: {urlHash},
        });
    }

    async save(dto: CreateArticleDto): Promise<article> {
        const {
            title,
            url,
            urlHash,
            pubDate,
            source,
            category,
            language,
            context,
            embedding,
            imageUrl,
            shortSummary,
            longSummary,
        } = dto;

        const formattedEmbedding = `[${(embedding ?? []).join(',')}]`;

        const result = await this.prisma.$queryRawUnsafe<article[]>(
            `
                INSERT INTO article (title, urlHash, pubDate, source, category,
                                     language, url, context, createdAt, embedding,
                                     "context_tsv", imageUrl, shortSummary, longSummary)
                VALUES ($1, $2, $3, $4, $5,
                        $6, $7, $8, now(), $9::vector,
                        to_tsvector('simple', $1), $10, $11, $12) RETURNING *;
            `,
            title,
            urlHash,
            pubDate,
            source,
            category,
            language,
            url,
            context,
            formattedEmbedding,
            imageUrl,
            shortSummary,
            longSummary
        );

        return result[0];
    }
}