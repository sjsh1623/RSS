import { Module } from '@nestjs/common';
import { UserCategoryPreferenceController } from './user-category-preference.controller';
import { UserCategoryPreferenceService } from './user-category-preference.service';
import { PrismaService } from '@/shared/prisma.service';

@Module({
    controllers: [UserCategoryPreferenceController],
    providers: [UserCategoryPreferenceService, PrismaService],
})
export class UserCategoryPreferenceModule {}