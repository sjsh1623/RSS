import { Injectable } from '@nestjs/common';
import { FeedProvider } from '@/domain/integration/feed-provider.gateway';
import { FeedItem } from '@/domain/integration/feed-item.interface';
import Parser from 'rss-parser';

@Injectable()
export class RssFeedProvider implements FeedProvider {
    private parser = new Parser();

    supports(providerType: string): boolean {
        return providerType === 'news';    // or whatever your RSS type is
    }

    async fetch(config: {
        url: string;
        providerId: number;
        providerName: string;
        providerType: string;
        language: string;
    }): Promise<FeedItem[]> {
        const feed = await this.parser.parseURL(config.url);
        return feed.items.map(item => ({
            url:      item.link!,
            title:    item.title!,
            pubDate:  item.pubDate || '',
            providerId:   config.providerId,
            providerName: config.providerName,
            providerType: config.providerType,
            content:     item.content || '',
            imageUrl:    (item.enclosure && item.enclosure.url) || '',
            language:    config.language,
        }));
    }
}