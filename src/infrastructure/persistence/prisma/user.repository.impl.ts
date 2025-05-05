import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IUserRepository } from '@/domain/user/repositories/user.repository.interface';
import { User } from '@/domain/user/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findByEmail(email: string): Promise<User | null> {
        const u = await this.prisma.user.findUnique({ where: { email } });
        if (!u) return null;
        return new User(u.id, u.email, u.password, u.name, u.createdAt);
    }

    async findById(id: number): Promise<User | null> {
        const u = await this.prisma.user.findUnique({ where: { id } });
        if (!u) return null;
        return new User(u.id, u.email, u.password, u.name, u.createdAt);
    }

    async create(data: { email: string; passwordHash: string; name?: string | null }): Promise<User> {
        const u = await this.prisma.user.create({
            data: {
                email: data.email,
                password: data.passwordHash,
                name: data.name ?? null,
            },
        });
        return new User(u.id, u.email, u.password, u.name, u.createdAt);
    }
}