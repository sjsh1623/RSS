// src/domain/integration/feed-provider.gateway.ts

import { FeedItem } from './feed-item.interface';

export interface FeedProvider {
  supports(providerName: string): boolean;
  fetch(config: {
    url: string;
    providerId: number;
    providerName: string;
    providerType: string;
    language: string;
  }): Promise<FeedItem[]>;
}