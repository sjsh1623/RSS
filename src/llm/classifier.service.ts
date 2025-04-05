import { Injectable } from '@nestjs/common';
import { OllamaClient } from './ollama.client';

@Injectable()
export class ClassifierService {
    constructor(private readonly ollama: OllamaClient) {}

    async classifyAndSummarize(content: string): Promise<{
        category: string;
        subcategory: string;
        summary: string;
    }> {
        const prompt = `
다음 글의 대분류(category), 중분류(subcategory), 요약(summary)을 JSON 형식으로 알려줘.

사용 가능한 category 목록:
["technology", "business", "politics", "economy", "lifestyle", "travel", "beauty", "education", "sports"]

사용 가능한 subcategory 목록 (예시):
["ai", "frontend", "investment", "mental_health", "job_hunting", "mobile_dev", "nutrition", "interior", "drama"]

결과는 아래 형식으로 출력해줘:
{
  "category": "technology",
  "subcategory": "ai",
  "summary": "요약 2줄"
}

본문:
${content}
`;

        const raw = await this.ollama.ask(prompt);

        try {
            const parsed = JSON.parse(raw);
            return parsed;
        } catch (e) {
            console.error('JSON 파싱 실패:', raw);
            throw new Error('분류/요약 결과 파싱 실패');
        }
    }
}