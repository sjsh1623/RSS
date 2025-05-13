import {FeedConfig} from "@/domain/integration/feed-config.interface";

export interface IReadRssSourceRepository {
  findAllActive(): Promise<FeedConfig[]>;
}
