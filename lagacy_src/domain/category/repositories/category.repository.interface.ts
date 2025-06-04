import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  create(name: string, code: string): Promise<Category>;
  update(id: number, name: string, code: string): Promise<Category>;
  delete(id: number): Promise<void>;
}
