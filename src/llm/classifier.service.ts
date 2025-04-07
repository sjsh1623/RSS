import {Injectable} from '@nestjs/common';
import {GroqClient} from "@/llm/groq.client";

@Injectable()
export class ClassifierService {
    constructor(private readonly groq: GroqClient) {
    }

    async classifyAndSummarize(content: string): Promise<{
        category: string;
        subcategory: string;
        summary: string;
    }> {
        const prompt = `
        다음 글의 대분류(category), 중분류(subcategory), 요약(summary)을 JSON 형식으로 알려줘.
        
        사용 가능한 category 목록: ["technology", "business", "politics", "economy", "lifestyle", "travel", "beauty", "education", "sports"]
        사용 가능한 subcategory 목록 (예시): ["ai", "frontend", "investment", "mental_health", "job_hunting", "mobile_dev", "nutrition", "interior", "drama"]
        결과는 아래 형식으로 출력해줘:
        {
          "category": "위 카테고리 목록중 하나",
          "subcategory": "위 Subcategory 목록중 하나",
          "summary": "요약 2줄 (한글)"
        }

        본문: ${content}`;

        const raw = await this.groq.ask(prompt);

        try {
            console.log(raw)
            return JSON.parse(raw);
        } catch (e) {
            console.error('JSON 파싱 실패:', raw);
            throw new Error('분류/요약 결과 파싱 실패');
        }
    }
}