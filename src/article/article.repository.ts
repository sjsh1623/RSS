import { PrismaService } from '@/shared/prisma.service';
import { Injectable } from '@nestjs/common';
import { article } from '@prisma/client';

type ArticleInput = Omit<article, 'id' | 'createdAt'> & {
    embedding?: number[]; // ✅ embedding 필드 추가 (선택적)
};

@Injectable()
export class ArticleRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByHash(linkHash: string): Promise<article | null> {
        return this.prisma.article.findUnique({
            where: { linkHash },
        });
    }

    async save(data: Omit<ArticleInput, 'id' | 'createdAt'>): Promise<article> {
        const {
            title,
            link,
            linkHash,
            pubDate,
            source,
            category,
            language,
            url,
            context,
            embedding,
        } = data;

        const embeddingArr = embedding ?? [];
        const embeddingFormatted = `[${embeddingArr.join(',')}]`;

        const inserted = await this.prisma.$queryRawUnsafe<article[]>(`
                    INSERT INTO article (
                        title, link, "linkHash", "pubDate", source, category,
                        language, url, context, "createdAt", embedding, "context_tsv"
                    ) VALUES (
                                 $1, $2, $3, $4, $5, $6,
                                 $7, $8, $9, now(), $10::vector, to_tsvector('simple', $1)
                             )
                        RETURNING id;
            `,
            title, link, linkHash, pubDate, source, category,
            language, url, context, embeddingFormatted
        );

        return inserted[0];
    }
}