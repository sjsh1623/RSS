import { PrismaService } from '@/shared/prisma.service';
import { Injectable } from '@nestjs/common';
import { article } from '@prisma/client';

@Injectable()
export class ArticleRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByHash(linkHash: string): Promise<article | null> {
        return this.prisma.article.findUnique({
            where: { linkHash },
        });
    }

    async save(data: Omit<article, 'id' | 'createdAt'>): Promise<article> {
        return this.prisma.article.create({ data });
    }
}