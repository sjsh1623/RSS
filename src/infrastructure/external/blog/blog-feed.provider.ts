import { Injectable } from '@nestjs/common';
import { FeedProvider } from '@/domain/integration/feed-provider.gateway';

// Placeholder for future blog API integration
@Injectable()
export class BlogFeedProvider implements FeedProvider {
  supports(type: string): boolean {
    return type === 'BLOG';
  }

  async fetch(config: { url: string; sourceTypeId: number; sourceTypeName: string; language: string; [key: string]: any }) {
    // TODO: Implement blog API fetch logic
    return [];
  }
}
