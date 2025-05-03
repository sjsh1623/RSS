import { CategoryRepository } from '../category.repository';
import { PrismaService } from '@/shared/prisma.service';

describe('CategoryRepository', () => {
    let repository: CategoryRepository;
    let prisma: PrismaService;

    beforeEach(() => {
        prisma = {
            category: {
                findMany: jest.fn(),
            },
        } as any;

        repository = new CategoryRepository(prisma);
    });

    it('should return active categories with active subcategories', async () => {
        const mockData = [
            {
                id: 1,
                name: 'Tech',
                code: 'TECH',
                subcategory: [{ id: 11, name: 'AI', code: 'AI' }],
            },
        ];
        (prisma.category.findMany as jest.Mock).mockResolvedValue(mockData);

        const result = await repository.findAllActiveCategoriesWithSubcategories();

        expect(prisma.category.findMany).toHaveBeenCalledWith({
            where: { is_active: true },
            include: { subcategory: { where: { is_active: true } } },
        });
        expect(result).toEqual(mockData);
    });
});