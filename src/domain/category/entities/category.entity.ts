export class Category {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly code: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly subcategories: Subcategory[],
  ) {}
}

export class Subcategory {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly code: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
