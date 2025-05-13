// src/infrastructure/external/llm/llm.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CohereLlmService } from './cohere-llm.service';
import { MockLlmService }  from './mock-llm.service';
import { LLM_SERVICE }      from './llm-service.token';

@Module({
    imports: [ConfigModule],       // ConfigService 를 쓰기 위해
    providers: [
        {
            provide: LLM_SERVICE,
            useFactory: (config: ConfigService) => {
                // boolean 처리를 안정적으로
                const useMock = config.get<string>('LLM_MOCK') === 'true';
                return useMock
                    ? new MockLlmService()
                    : new CohereLlmService();
            },
            inject: [ConfigService],
        },
    ],
    exports: [LLM_SERVICE],
})
export class LlmModule {}