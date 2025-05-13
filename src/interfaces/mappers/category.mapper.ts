import { Category } from '@/domain/category/entities/category.entity';
import { CategoryDto } from '../dto/category.dto';

export class CategoryMapper {
  static toDto(c: Category): CategoryDto {
    const dto = new CategoryDto();
    dto.id = c.id;
    dto.name = c.name;
    dto.createdAt = c.createdAt;
    dto.updatedAt = c.updatedAt;
    return dto;
  }
}
