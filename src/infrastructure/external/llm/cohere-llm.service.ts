import {Injectable, Logger} from '@nestjs/common';
import {CohereClient} from 'cohere-ai';
import {ILlmService} from '@/domain/llm/services/llm-service.interface';

@Injectable()
export class CohereLlmService implements ILlmService {
    private readonly logger = new Logger(CohereLlmService.name);
    private readonly client: CohereClient;

    constructor() {
        const apiKey = process.env.COHERE_API_KEY;
        if (!apiKey) {
            this.logger.warn('COHERE_API_KEY is not set');
        }
        this.client = new CohereClient({token: apiKey || ''});
    }

    async analyze(content: string): Promise<{ shortSummary: string; longSummary: string; category: string }> {
        const prompt = `{"category":"","shortSummary":"","longSummary":""}\nText: "${content}"`;
        try {
            const result = await this.client.generate({
                model: 'command-a-03-2025',
                prompt,
            });
            const generation = result.generations[0];
            const text = generation.text;
            const parsed = JSON.parse(text);
            return {
                shortSummary: parsed.shortSummary,
                longSummary: parsed.longSummary,
                category: parsed.category,
            };
        } catch (error) {
            this.logger.error('Cohere analyze failed', error.stack ?? error);
            throw error;
        }
    }
}