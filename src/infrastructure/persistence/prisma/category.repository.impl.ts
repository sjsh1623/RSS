import {Injectable} from '@nestjs/common';
import {ICategoryRepository} from '@/domain/category/repositories/category.repository.interface';
import {Category} from '@/domain/category/entities/category.entity';
import {PrismaService} from '@/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async findAll(): Promise<Category[]> {
        const records = await this.prisma.category.findMany();
        return records.map(r =>
            new Category(
                r.id,
                r.name,
                r.code,
                r.createdAt,
                r.updatedAt,
                [] // 아직 서브카테고리가 없으므로 빈 배열
            )
        );
    }

    async findById(id: number): Promise<Category | null> {
        const r = await this.prisma.category.findUnique({
            where: {id},
        });
        if (!r) return null;
        return new Category(
            r.id,
            r.name,
            r.code,
            r.createdAt,
            r.updatedAt,
            [] // 빈 배열
        );
    }

    async create(name: string, code: string): Promise<Category> {
        const r = await this.prisma.category.create({
            data: {name, code},
        });
        return new Category(
            r.id,
            r.name,
            r.code,
            r.createdAt,
            r.updatedAt,
            [] // 새로 생성된 카테고리에는 서브가 없음
        );
    }

    async update(id: number, name: string, code: string): Promise<Category> {
        const r = await this.prisma.category.update({
            where: {id},
            data: {name, code}, // origin 필드는 DB에 없음
        });
        return new Category(
            r.id,
            r.name,
            r.code,
            r.createdAt,
            r.updatedAt,
            [] // 여기도 빈 배열
        );
    }

    async delete(id: number): Promise<void> {
        await this.prisma.category.delete({
            where: {id},
        });
    }
}