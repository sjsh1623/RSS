import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ListCategoriesUseCase } from '@/application/category/list-categories.usecase';
import { GetCategoryUseCase } from '@/application/category/get-category.usecase';
import { CreateCategoryUseCase } from '@/application/category/create-category.usecase';
import { UpdateCategoryUseCase } from '@/application/category/update-category.usecase';
import { DeleteCategoryUseCase } from '@/application/category/delete-category.usecase';
import { CategoryDto } from '../dto/category.dto';
import {ApiTags} from "@nestjs/swagger";

class CreateCategoryRequest {
  name!: string;
  code!: string;
}

class UpdateCategoryRequest {
  name!: string;
  code!: string;
}


@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly listUC: ListCategoriesUseCase,
    private readonly getUC: GetCategoryUseCase,
    private readonly createUC: CreateCategoryUseCase,
    private readonly updateUC: UpdateCategoryUseCase,
    private readonly deleteUC: DeleteCategoryUseCase,
  ) {}

  @Get()
  list(): Promise<CategoryDto[]> {
    return this.listUC.execute();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<CategoryDto> {
    return this.getUC.execute(Number(id));
  }

  @Post()
  create(@Body() req: CreateCategoryRequest): Promise<CategoryDto> {
    return this.createUC.execute(req.name, req.code);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() req: UpdateCategoryRequest): Promise<CategoryDto> {
    return this.updateUC.execute(Number(id), req.name, req.code);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteUC.execute(Number(id));
  }
}
