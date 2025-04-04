import { Test, TestingModule } from '@nestjs/testing';
import { RssService, ParsedArticle } from './rss.service';

describe('RssService', () => {
  let service: RssService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RssService],
    }).compile();

    service = module.get<RssService>(RssService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch and return parsed RSS articles with metadata', async () => {
    const url = 'https://www.yna.co.kr/rss/news.xml';
    const meta = {
      source: '연합뉴스',
      category: 'General',
      language: 'ko',
    };

    const articles: ParsedArticle[] = await service.fetch(url, meta);

    expect(Array.isArray(articles)).toBe(true);
    if (articles.length > 0) {
      const article = articles[0];
      expect(article).toHaveProperty('title');
      expect(article).toHaveProperty('link');
      expect(article).toHaveProperty('pubDate');
      expect(article).toHaveProperty('source', meta.source);
      expect(article).toHaveProperty('category', meta.category);
      expect(article).toHaveProperty('language', meta.language);
    }
  }, 10000); // network call이 있기 때문에 10초로 timeout 설정
});