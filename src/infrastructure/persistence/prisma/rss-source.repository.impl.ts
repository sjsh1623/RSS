import {Injectable} from '@nestjs/common';
import {IReadRssSourceRepository} from '@/domain/rss/repositories/rss-source.repository.interface';
import {RssSource} from '@/domain/rss/entities/rss-source.entity';
import {PrismaService} from "@/infrastructure/persistence/prisma/prisma.service";


@Injectable()
export class RssSourceRepositoryImpl implements IReadRssSourceRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async findAllActive(): Promise<RssSource[]> {
        const records = await this.prisma.rss.findMany({
            include: {
                sourceType: {
                    select: {name: true}
                }
            }
        });
        return records.map(r => ({
            id: r.id,
            url: r.url,
            sourceTypeId : r.sourceTypeId,
            sourceTypeName: r.sourceType.name,
            language: r.language,
        }))
    }
}
