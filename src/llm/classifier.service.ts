import {Injectable} from '@nestjs/common';
import {GroqClient} from "@/llm/groq.client";
import {CategoryService} from "@/category/category.service";

@Injectable()
export class ClassifierService {
    constructor(
        private readonly groq: GroqClient,
        private readonly categoryService: CategoryService
    ) {}

    async classifyAndSummarize(content: string): Promise<{
        category: string;
        imgUrl: string;
        summary: string;
    }> {
        const categories = await this.categoryService.getCategoriesFromCache();
        const prompt = `
        다음 글의 대분류(category), 요약(summary) 그리고 메인 이미지 URL을 JSON 형식으로 알려줘.

        사용 가능한 category 목록: ${JSON.stringify(categories)}
        결과는 아래 형식으로 출력해줘:
        {
          "category": "위 카테고리 목록중 하나",
          "summary": "요약 3줄 (한글)",
          "imgUrl" : "이미지 URL"
        }

        본문: ${content}`;

        const raw = await this.groq.ask(prompt);

        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error('JSON 파싱 실패:', raw);
            throw new Error('분류/요약 결과 파싱 실패');
        }
    }
}