import {Test, TestingModule} from '@nestjs/testing';
import {ArticleRepository} from '../article.repository';
import {PrismaService} from '@/shared/prisma.service';
import {CreateArticleDto} from '../dto/create-article.dto';

describe('ArticleRepository', () => {
    let repository: ArticleRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticleRepository,
                {
                    provide: PrismaService,
                    useValue: {
                        article: {
                            findUnique: jest.fn(),
                        },
                        $queryRawUnsafe: jest.fn(),
                    },
                },
            ],
        }).compile();

        repository = module.get<ArticleRepository>(ArticleRepository);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should find article by urlHash', async () => {
        const mockArticle = {id: 1, title: 'Test Article'} as any;
        (prisma.article.findUnique as jest.Mock).mockResolvedValue(mockArticle);

        const result = await repository.findByHash('abc123');
        expect(result).toEqual(mockArticle);
        expect(prisma.article.findUnique).toHaveBeenCalledWith({where: {urlHash: 'abc123'}});
    });

    it('should insert article with raw query', async () => {
        const dto: CreateArticleDto = {
            title: 'Test',
            url: 'https://example.com',
            urlHash: 'hash123',
            pubDate: new Date(),
            source: 'TestSource',
            category: 'Tech',
            language: 'en',
            context: 'context',
            shortSummary: 'short',
            longSummary: 'long',
            imageUrl: 'https://image.com',
            embedding: [1, 2, 3],
        };

        const mockReturn = [{id: 1}];
        (prisma.$queryRawUnsafe as jest.Mock).mockResolvedValue(mockReturn);

        const result = await repository.save(dto);
        expect(result).toEqual(mockReturn[0]);
        expect(prisma.$queryRawUnsafe).toHaveBeenCalled();
    });
});