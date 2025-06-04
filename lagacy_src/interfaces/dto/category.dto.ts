import { ApiProperty } from '@nestjs/swagger';

export class SubcategoryDto {
  @ApiProperty({ description: '고유 식별자', example: 11 })
  id!: number;

  @ApiProperty({ description: '서브카테고리 이름', example: '프론트엔드' })
  name!: string;

  @ApiProperty({ description: '서브카테고리 코드', example: 'frontend' })
  code!: string;

  @ApiProperty({ description: '생성 일시', example: '2025-05-06T12:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ description: '수정 일시', example: '2025-05-06T12:30:00.000Z' })
  updatedAt!: Date;
}

export class CategoryDto {
  @ApiProperty({ description: '고유 식별자', example: 1 })
  id!: number;

  @ApiProperty({ description: '카테고리 이름', example: 'IT/기술' })
  name!: string;

  @ApiProperty({ description: '카테고리 코드', example: 'tech' })
  code!: string;

  @ApiProperty({ description: '생성 일시', example: '2025-05-06T12:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ description: '수정 일시', example: '2025-05-06T12:30:00.000Z' })
  updatedAt!: Date;

  @ApiProperty({
    description: '하위 카테고리 리스트',
    type: [SubcategoryDto],
  })
  subcategories!: SubcategoryDto[];
}