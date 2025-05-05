// src/infrastructure/external/embedding/embedding.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EmbeddingService } from './embedding.service';

@Module({
    imports: [
        HttpModule.register({
            // 필요하다면 타임아웃, 헤더 등 기본 설정
            timeout: 5000,
        }),
    ],
    providers: [EmbeddingService],
    exports: [EmbeddingService],
})
export class EmbeddingModule {}