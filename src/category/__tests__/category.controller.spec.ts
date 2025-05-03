import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';

describe('CategoryController', () => {
    let controller: CategoryController;
    let service: CategoryService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [
                {
                    provide: CategoryService,
                    useValue: {
                        findActiveCategories: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<CategoryController>(CategoryController);
        service = module.get<CategoryService>(CategoryService);
    });

    it('should return active categories from service', async () => {
        const mockResult = [
            {
                id: 1,
                name: 'Tech',
                code: 'TECH',
                subcategories: [{ id: 11, name: 'AI', code: 'AI' }],
            },
        ];

        jest.spyOn(service, 'findActiveCategories').mockResolvedValue(mockResult);

        const result = await controller.getActiveCategories();

        expect(result).toEqual(mockResult);
        expect(service.findActiveCategories).toHaveBeenCalled();
    });
});