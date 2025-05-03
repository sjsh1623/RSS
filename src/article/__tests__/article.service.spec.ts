import {Test, TestingModule} from '@nestjs/testing';
import {ArticleService} from '../article.service';
import {ArticleRepository} from '../article.repository';
import {ExtractorUtil} from "@/utils/extractor.util";
import {ClassifierService} from "@/llm/classifier.service";
import {EmbeddingService} from "@/embedding/embeddingService";

jest.mock('@/utils/hash.util', () => ({
    generateHash: jest.fn().mockReturnValue('hashed-url'),
}));

describe('ArticleService', () => {
    let service: ArticleService;
    let repo: ArticleRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticleService,
                {
                    provide: ArticleRepository,
                    useValue: {
                        findByHash: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: ExtractorUtil,
                    useValue: {
                        extractArticle: jest.fn().mockResolvedValue({text: 'extracted content'}),
                    },
                },
                {
                    provide: ClassifierService,
                    useValue: {
                        classifyAndSummarizeLLM: jest.fn().mockResolvedValue({
                            shortSummary: 'short summary',
                            longSummary: 'long summary',
                            imgUrl: 'https://image.url',
                            category: 'Tech',
                        }),
                    },
                },
                {
                    provide: EmbeddingService,
                    useValue: {
                        getEmbedding: jest.fn().mockResolvedValue([1, 2, 3]),
                    },
                },
            ],
        }).compile();

        service = module.get<ArticleService>(ArticleService);
        repo = module.get<ArticleRepository>(ArticleRepository);
    });

    it('should return false if article already exists', async () => {
        (repo.findByHash as jest.Mock).mockResolvedValue({id: 1});
        const result = await service.saveArticleWithLLMProcessing({
            title: 'Title',
            url: 'https://x.com',
            pubDate: new Date(),
            source: 'source',
            language: 'en',
        });

        expect(result).toBe(false);
    });

    it('should process and save article if not exists', async () => {
        (repo.findByHash as jest.Mock).mockResolvedValue(null);
        (repo.save as jest.Mock).mockResolvedValue({id: 1});

        const result = await service.saveArticleWithLLMProcessing({
            title: 'Title',
            url: 'https://x.com',
            pubDate: new Date(),
            source: 'source',
            language: 'en',
        });

        expect(result).toEqual({id: 1});
        expect(repo.save).toHaveBeenCalled();
    });
});