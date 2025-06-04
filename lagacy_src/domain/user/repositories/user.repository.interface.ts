import { User } from '../entities/user.entity';

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(data: { email: string; passwordHash: string; name?: string | null }): Promise<User>;
}