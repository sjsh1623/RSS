import { Module } from '@nestjs/common';
import {CohereLlmService} from "@/infrastructure/external/llm/cohere-llm.service";
import {MockLlmService} from "@/infrastructure/external/llm/mock-llm.service";

@Module({
  providers: [
    { provide: 'LLM_SERVICE', useClass:  MockLlmService},
  ],
  exports: ['LLM_SERVICE'],
})
export class LlmModule {}
