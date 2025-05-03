import { CategoryService } from '../category.service';
import { CategoryRepository } from '../category.repository';

describe('CategoryService', () => {
    let service: CategoryService;
    let repository: CategoryRepository;

    beforeEach(() => {
        repository = {
            findAllActiveCategoriesWithSubcategories: jest.fn(),
        } as any;

        service = new CategoryService(repository);
    });

    it('should transform and return category response DTOs', async () => {
        const mockCategories = [
            {
                id: 1,
                name: 'Tech',
                code: 'TECH',
                subcategory: [
                    { id: 11, name: 'AI', code: 'AI' },
                ],
            },
        ];

        (repository.findAllActiveCategoriesWithSubcategories as jest.Mock).mockResolvedValue(mockCategories);

        const result = await service.findActiveCategories();

        expect(result).toEqual([
            {
                id: 1,
                name: 'Tech',
                code: 'TECH',
                subcategories: [{ id: 11, name: 'AI', code: 'AI' }],
            },
        ]);
    });
});