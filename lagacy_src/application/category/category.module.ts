import {Module} from '@nestjs/common';
import {PrismaModule} from '@/infrastructure/persistence/prisma/prisma.module';
import {RedisModule} from '@/shared/redis.module';
import {CategoryController} from '@/interfaces/controllers/category.controller';
import {CreateCategoryUseCase} from './create-category.usecase';
import {ListCategoriesUseCase} from './list-categories.usecase';
import {GetCategoryUseCase} from './get-category.usecase';
import {UpdateCategoryUseCase} from './update-category.usecase';
import {DeleteCategoryUseCase} from './delete-category.usecase';
import {CategoryRepositoryImpl} from '@/infrastructure/persistence/prisma/category.repository.impl';
import {CATEGORY_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Module({
    imports: [PrismaModule, RedisModule],
    controllers: [CategoryController],
    providers: [
        {provide: CATEGORY_REPOSITORY, useClass: CategoryRepositoryImpl},
        CreateCategoryUseCase,
        ListCategoriesUseCase,
        GetCategoryUseCase,
        UpdateCategoryUseCase,
        DeleteCategoryUseCase,
    ],
    exports: [
        ListCategoriesUseCase,
        UpdateCategoryUseCase,
    ],
})
export class CategoryModule {
}
