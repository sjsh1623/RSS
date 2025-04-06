import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleRepository } from './article.repository';
import { PrismaService } from '@/shared/prisma.service';

@Module({
    providers: [ArticleService, ArticleRepository, PrismaService],
    exports: [ArticleService], // 💡 외부 모듈에서 사용할 수 있게 export
})
export class ArticleModule {}