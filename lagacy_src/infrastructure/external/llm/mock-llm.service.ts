import { Injectable, Logger } from '@nestjs/common';
import { ILlmService } from '@/domain/llm/services/llm-service.interface';

@Injectable()
export class MockLlmService implements ILlmService {
    private readonly logger = new Logger(MockLlmService.name);

    async analyze(content: string): Promise<{ shortSummary: string; longSummary: string; category: string }> {
        this.logger.debug('Mock analyze called');
        return {
            shortSummary: 'Mock short summary',
            longSummary: 'Mock long summary',
            category: 'MockCategory',
        };
    }
}