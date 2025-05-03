import {Injectable} from '@nestjs/common';
import {PrismaService} from '@/shared/prisma.service';
import {Category} from '@prisma/client';

@Injectable()
export class CategoryRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async findAllActiveCategoriesWithSubcategories(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }
}