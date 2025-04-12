import { Prisma } from '@prisma/client';

// src/user/user.entity.ts

export class UserEntity {
    id: number;
    email: string;
    password: string;
    name?: string | null;
    createdAt: Date;
}