import { Test, TestingModule } from '@nestjs/testing';
import { RssJobService } from './rss-job.service';

describe('RssJobService', () => {
  let service: RssJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RssJobService],
    }).compile();

    service = module.get<RssJobService>(RssJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
