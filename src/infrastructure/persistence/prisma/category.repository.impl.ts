import {Injectable} from '@nestjs/common';

import {ICategoryRepository} from '@/domain/category/repositories/category.repository.interface';
import {Category, Subcategory} from '@/domain/category/entities/category.entity';
import {PrismaService} from "@/infrastructure/persistence/prisma/prisma.service";

@Injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async findAll(): Promise<Category[]> {
        const records = await this.prisma.category.findMany();
        return records.map(r => new Category(
            r.id, r.name, r.code, r.createdAt, r.updatedAt,
            r.subcategories.map(s => new Subcategory(s.id, s.name, s.code, s.createdAt, s.updatedAt))
        ));
    }

    async findById(id: number): Promise<Category | null> {
        const r = await this.prisma.category.findUnique({
            where: {id}
        });
        if (!r) return null;
        return new Category(
            r.id, r.name, r.code, r.createdAt, r.updatedAt,
            r.subcategories.map(s => new Subcategory(s.id, s.name, s.code, s.createdAt, s.updatedAt))
        );
    }

    async create(name: string, code: string): Promise<Category> {
        // subcategories 포함해서 받아오도록 include 옵션 추가
        const r = await this.prisma.category.create({
            data: {name, code},
            include: {subcategories: true},
        });

        // 새 카테고리는 생성 직후 하위 카테고리가 없으므로 빈 배열을 넘겨줍니다.
        return new Category(
            r.id,
            r.name,
            r.code,
            r.createdAt,
            r.updatedAt,
            [],              // ← 여기에 빈 배열 추가
        );
    }

    async update(id: number, name: string, code: string): Promise<Category> {
        const r = await this.prisma.category.update({
            where: {id},
            data: {name, code}
        });
        return new Category(
            r.id, r.name, r.code, r.createdAt, r.updatedAt,
            r.subcategories.map(s => new Subcategory(s.id, s.name, s.code, s.createdAt, s.updatedAt))
        );
    }

    async delete(id: number): Promise<void> {
        await this.prisma.category.update({
            where: {id}
        });
    }
}
