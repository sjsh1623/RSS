import {Module} from '@nestjs/common';
import {ClassifierService} from './classifier.service';
import {OllamaClient} from "@/llm/ollama.client";
import {ConfigModule} from "@nestjs/config";
import {GroqClient} from "@/llm/groq.client";
import {CohereClient} from "@/llm/cohere.client";

@Module({
    imports: [ConfigModule], // ConfigService 사용 시 필요
    providers: [ClassifierService, OllamaClient, GroqClient, CohereClient],
    exports: [ClassifierService],
})
export class LlmModule {
}