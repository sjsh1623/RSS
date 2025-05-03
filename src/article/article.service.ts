import {Injectable} from '@nestjs/common';
import {ArticleRepository} from './article.repository';
import {CreateArticleDto} from './dto/create-article.dto';
import {article} from '@prisma/client';

import {generateHash} from '@/utils/hash.util';
import {ExtractorUtil} from "@/utils/extractor.util";
import {ClassifierService} from "@/llm/classifier.service";
import {EmbeddingService} from "@/embedding/embeddingService";

@Injectable()
export class ArticleService {
    constructor(
        private readonly articleRepository: ArticleRepository,
        private readonly extractor: ExtractorUtil,
        private readonly classifierService: ClassifierService,
        private readonly embeddingService: EmbeddingService,
    ) {
    }

    async saveArticleWithLLMProcessing(input: {
        title: string;
        pubDate: Date;
        url: string;
        source: string;
        language: string
    }): Promise<article | false> {
        const {title, pubDate, url, source, language} = input;

        // 1. 중복 검사
        const urlHash = generateHash(url);
        const exists = await this.articleRepository.findByHash(urlHash);
        if (exists) return false;

        // 2. 기사 추출
        const extracted = await this.extractor.extractArticle(url);
        const context = extracted?.text || '';

        // 3. 요약 및 카테고리 분류
        const refined = await this.classifierService.classifyAndSummarizeLLM(context.slice(0, 1000));
        const {shortSummary, longSummary, imgUrl: imageUrl, category} = refined;

        // 4. 임베딩 생성
        const embedding = await this.embeddingService.getEmbedding(shortSummary);

        // 5. DTO 구성 후 저장
        const dto: CreateArticleDto = {
            title,
            pubDate,
            url,
            urlHash,
            source,
            category,
            language,
            context,
            shortSummary,
            longSummary,
            imageUrl,
            embedding,
        };

        return await this.articleRepository.save(dto);
    }
}