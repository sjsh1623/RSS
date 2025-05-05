import { Category, Subcategory } from '../../domain/category/entities/category.entity';
import { CategoryDto, SubcategoryDto } from '../dto/category.dto';

export class CategoryMapper {
  static toDto(c: Category): CategoryDto {
    const dto = new CategoryDto();
    dto.id = c.id;
    dto.name = c.name;
    dto.code = c.code;
    dto.createdAt = c.createdAt;
    dto.updatedAt = c.updatedAt;
    dto.subcategories = c.subcategories.map(s => {
      const sd = new SubcategoryDto();
      sd.id = s.id;
      sd.name = s.name;
      sd.code = s.code;
      sd.createdAt = s.createdAt;
      sd.updatedAt = s.updatedAt;
      return sd;
    });
    return dto;
  }
}
