import { Injectable } from '@nestjs/common';
import { IReadRssSourceRepository } from '@/domain/rss/repositories/rss-source.repository.interface';
import { RssSource } from '@/domain/rss/entities/rss-source.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class RssSourceRepositoryImpl implements IReadRssSourceRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAllActive(): Promise<RssSource[]> {
        const rows = await this.prisma.rss.findMany({
            include: {
                provider: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                    },
                },
            },
        });

        return rows.map(r => new RssSource({
            id:           r.id,
            url:          r.url,
            language:     r.language,
            providerId:   r.providerId,
            providerName: r.provider.name,
            providerType: r.provider.type,
            createdAt:    r.createdAt!,    // ← now provided
            updatedAt:    r.updatedAt!,    // ← now provided
        }));
    }
}