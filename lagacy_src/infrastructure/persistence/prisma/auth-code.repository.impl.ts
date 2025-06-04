// src/infrastructure/persistence/prisma/auth-code.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IAuthCodeRepository } from '@/domain/auth/repositories/auth-code.repository.interface';
import { AuthCode } from '@/domain/auth/entities/auth-code.entity';

@Injectable()
export class AuthCodeRepositoryImpl implements IAuthCodeRepository {
    constructor(private readonly prisma: PrismaService) {}

    /** 인증코드를 저장합니다. */
    async save(code: AuthCode): Promise<void> {
        await this.prisma.authCode.create({
            data: {
                email: code.email,
                code: code.code,
                expiresAt: code.expiresAt,
                // createdAt 은 기본값(now())이 자동으로 채워집니다.
            },
        });
    }

    /** 이메일로 마지막(최신) 인증코드를 조회합니다. */
    async find(email: string): Promise<AuthCode | null> {
        const rec = await this.prisma.authCode.findFirst({
            where: { email },
            orderBy: { createdAt: 'desc' },
        });
        if (!rec) return null;
        return new AuthCode(rec.email, rec.code, rec.expiresAt);
    }

    /** 해당 이메일의 모든 인증코드를 삭제합니다. */
    async remove(email: string): Promise<void> {
        await this.prisma.authCode.deleteMany({
            where: { email },
        });
    }
}