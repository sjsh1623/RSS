import Parser from 'rss-parser';
import { ParsedArticle } from '@/types/rss';

const parser = new Parser();

export class RSSFetcher {
    static async fetch(feedUrl: string, source: string): Promise<ParsedArticle[]> {
        try {
            const feed = await parser.parseURL(feedUrl);
            return feed.items.map(item => ({
                title: item.title ?? '',
                link: item.link ?? '',
                pubDate: item.pubDate,
                source,
            }));
        } catch (error) {
            console.error(`[RSSFetcher] Error fetching ${source}:`, error);
            return [];
        }
    }
}