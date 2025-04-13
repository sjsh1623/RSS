import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma.service';

@Injectable()
export class UserCategoryPreferenceService {
    constructor(private readonly prisma: PrismaService) {}

    async saveUserCategoryPreference({
                                         userId,
                                         categoryId,
                                         sourceTypeId,
                                     }: {
        userId: number;
        categoryId: number;
        sourceTypeId: number;
    }) {
        return this.prisma.userCategoryPreference.upsert({
            where: {
                userId_categoryId_sourceTypeId: {
                    userId,
                    categoryId,
                    sourceTypeId,
                },
            },
            update: {},
            create: {
                userId,
                categoryId,
                sourceTypeId,
            },
        });
    }

    async getUserCategoryPreference(userId: number) {
        return this.prisma.userCategoryPreference.findMany({
            where: { userId },
            include: {
                category: true,
                sourceType: true,
            },
        });
    }

    async deleteUserCategoryPreference({
                                           userId,
                                           categoryId,
                                           sourceTypeId,
                                       }: {
        userId: number;
        categoryId: number;
        sourceTypeId: number;
    }) {
        try {
            return await this.prisma.userCategoryPreference.delete({
                where: {
                    userId_categoryId_sourceTypeId: {
                        userId,
                        categoryId,
                        sourceTypeId,
                    },
                },
            });
        } catch (err) {
            throw new NotFoundException('Preference not found');
        }
    }

    async updateUserCategoryPreference({
                                           userId,
                                           oldCategoryId,
                                           oldSourceTypeId,
                                           newCategoryId,
                                           newSourceTypeId,
                                       }: {
        userId: number;
        oldCategoryId: number;
        oldSourceTypeId: number;
        newCategoryId: number;
        newSourceTypeId: number;
    }) {
        // 먼저 기존 값이 있는지 확인
        const existing = await this.prisma.userCategoryPreference.findUnique({
            where: {
                userId_categoryId_sourceTypeId: {
                    userId,
                    categoryId: oldCategoryId,
                    sourceTypeId: oldSourceTypeId,
                },
            },
        });

        if (!existing) {
            throw new NotFoundException('Original preference not found');
        }

        // 새로운 조합이 이미 존재한다면 충돌
        const duplicate = await this.prisma.userCategoryPreference.findUnique({
            where: {
                userId_categoryId_sourceTypeId: {
                    userId,
                    categoryId: newCategoryId,
                    sourceTypeId: newSourceTypeId,
                },
            },
        });

        if (duplicate) {
            throw new ConflictException('New preference already exists');
        }

        // 삭제 후 새로 생성
        await this.prisma.userCategoryPreference.delete({
            where: {
                userId_categoryId_sourceTypeId: {
                    userId,
                    categoryId: oldCategoryId,
                    sourceTypeId: oldSourceTypeId,
                },
            },
        });

        return this.prisma.userCategoryPreference.create({
            data: {
                userId,
                categoryId: newCategoryId,
                sourceTypeId: newSourceTypeId,
            },
        });
    }
}