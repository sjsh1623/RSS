import {Injectable} from '@nestjs/common';
import {ArticleRepository} from './article.repository';
import {generateHash} from '@/utils/hash.util';
import {article} from '@prisma/client';
import {ExtractorUtil} from "@/utils/extractor.util";
import {ClassifierService} from "@/llm/classifier.service";
import {EmbeddingService} from "@/embedding/embeddingService"

@Injectable()
export class ArticleService {
    constructor(
        private readonly repo: ArticleRepository,
        private readonly classifierService: ClassifierService, // 추가
        private readonly extractor: ExtractorUtil, // 이것도 DI로 관리하면 좋습니다
        private readonly embeddingService : EmbeddingService,
    ) {
    }

    async saveIfNotExists(data: Omit<article, 'id' | 'createdAt' | 'linkHash' | 'category'>): Promise<boolean> {
        const linkHash = generateHash(data.link || '');

        const existing = await this.repo.findByHash(linkHash);
        if (existing) return false;

        const extraction = await this.extractor.extractArticle(data.link || '');
        const context = extraction?.text || '';
        //const test = await this.classifierService.classifyAndSummarize(context.slice(0,1000));
        const embedding = await this.embeddingService.getEmbedding(context);
        const category = "test";

        await this.repo.save({
            ...data,
            linkHash,
            category,
            embedding,
            context
        });

        return true;
    }
}