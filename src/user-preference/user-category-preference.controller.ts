import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { UserCategoryPreferenceService } from './user-category-preference.service';

@Controller('user-category-preference')
export class UserCategoryPreferenceController {
    constructor(
        private readonly preferenceService: UserCategoryPreferenceService,
    ) {}

    @Post()
    async createOrUpdatePreference(
        @Body() body: {
            userId: number;
            categoryId: number;
            sourceTypeId: number;
        },
    ) {
        return this.preferenceService.saveUserCategoryPreference(body);
    }

    @Put()
    async updatePreference(@Body() body: {
        userId: number;
        oldCategoryId: number;
        oldSourceTypeId: number;
        newCategoryId: number;
        newSourceTypeId: number;
    }) {
        return this.preferenceService.updateUserCategoryPreference(body);
    }

    @Get()
    async getPreferences(@Query('userId') userId: number) {
        return this.preferenceService.getUserCategoryPreference(userId);
    }

    @Delete()
    async deletePreference(
        @Query('userId') userId: number,
        @Query('categoryId') categoryId: number,
        @Query('sourceTypeId') sourceTypeId: number,
    ) {
        return this.preferenceService.deleteUserCategoryPreference({
            userId,
            categoryId,
            sourceTypeId,
        });
    }
}