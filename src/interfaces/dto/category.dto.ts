export class CategoryDto {
  id!: number;
  name!: string;
  code!: string;
  createdAt!: Date;
  updatedAt!: Date;
  subcategories!: SubcategoryDto[];
}

export class SubcategoryDto {
  id!: number;
  name!: string;
  code!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
