import {Injectable} from '@nestjs/common';
import {PrismaService} from '@/shared/prisma.service';
import {user} from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(data: Omit<user, 'id' | 'createdAt'>): Promise<user> {
        return this.prisma.user.create({data});
    }

    async findByEmail(email: string): Promise<user | null> {
        return this.prisma.user.findUnique({where: {email}});
    }

    async findById(id: number): Promise<user | null> {
        return this.prisma.user.findUnique({where: {id}});
    }
}