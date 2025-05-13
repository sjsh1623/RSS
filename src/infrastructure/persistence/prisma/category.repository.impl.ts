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
                r.createdAt,
                r.updatedAt,
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
            r.createdAt,
            r.updatedAt,
        );
    }

    async findByName(name: string): Promise<Category | null> {
        const r = await this.prisma.category.findUnique({
            where: {name},
        });
        if (!r) return null;
        return new Category(
            r.id,
            r.name,
            r.createdAt,
            r.updatedAt,
        );
    }

    async create(name: string): Promise<Category> {
        const r = await this.prisma.category.create({
            data: {name},
        });
        return new Category(
            r.id,
            r.name,
            r.createdAt,
            r.updatedAt,
        );
    }

    async update(id: number, name: string): Promise<Category> {
        const r = await this.prisma.category.update({
            where: {id},
            data: {name}, // origin 필드는 DB에 없음
        });
        return new Category(
            r.id,
            r.name,
            r.createdAt,
            r.updatedAt,
        );
    }

    async delete(id: number): Promise<void> {
        await this.prisma.category.delete({
            where: {id},
        });
    }
}