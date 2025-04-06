import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma.service';

@Injectable()
export class RssSourceRepository {
    constructor(private readonly prisma: PrismaService) {}

    // 모든 활성화된 RSS Source 조회
    async findAllActive() {
        return this.prisma.rss.findMany({
            where: { is_active: true },
            orderBy: { url: 'asc' },
        });
    }

    // RSS Source 추가
    async create(data: { url: string; source: string; category: string; language: string }) {
        return this.prisma.rss.create({ data });
    }

    // RSS Source 삭제
    async removeById(id: number) {
        return this.prisma.rss.delete({ where: { id } });
    }

    // 비활성화 처리
    async deactivateById(id: number) {
        return this.prisma.rss.update({
            where: { id },
            data: { is_active: false },
        });
    }

    // 중복 확인
    async exists(url: string) {
        const found = await this.prisma.rss.findUnique({ where: { url } });
        return !!found;
    }
}