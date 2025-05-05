import { RssSource } from '../entities/rss-source.entity';

export interface IReadRssSourceRepository {
  findAllActive(): Promise<RssSource[]>;
}
