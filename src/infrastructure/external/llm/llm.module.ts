// src/infrastructure/external/llm/llm.module.ts
import { Module } from '@nestjs/common';
import { CohereLlmService } from './cohere-llm.service';
import { LLM_SERVICE }      from './llm-service.token';  // 토큰 정의

@Module({
  providers: [
    { provide: LLM_SERVICE, useClass: CohereLlmService },
  ],
  exports: [LLM_SERVICE],  // 토큰을 외부에 노출해야 ArticleModule에서 import 가능
})
export class LlmModule {}