import { Injectable } from '@nestjs/common';
import Parser from 'rss-parser';
import { FeedProvider } from '../../../domain/integration/feed-provider.gateway';

@Injectable()
export class RssFeedProvider implements FeedProvider {
  private parser = new Parser();

  supports(type: string): boolean {
    return type === 'RSS';
  }

  async fetch(config: { url: string; source: string; language: string; [key: string]: any }) {
    const feed = await this.parser.parseURL(config.url);
    return feed.items.map(item => ({
      url: item.link || '',
      title: item.title || '',
      pubDate: item.pubDate || '',
      source: config.source,
      content: item.content || item.contentSnippet || '',
      imageUrl: item.enclosure?.url || '',
      language: config.language,
    }));
  }
}
