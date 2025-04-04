import { Injectable, Logger } from '@nestjs/common';
const Parser = require('rss-parser');

export interface ParsedArticle {
    title: string;
    link: string;
    pubDate?: string;
    source: string;
    category: string;
    language: string;
}

@Injectable()
export class RssService {
    private readonly logger = new Logger(RssService.name);
    private readonly parser = new Parser();

    async fetch(feedUrl: string, meta: { source: string; category: string; language: string }): Promise<ParsedArticle[]> {
        this.logger.log(`📡 [${meta.source}] RSS 수집 중: ${feedUrl}`);

        try {
            const feed = await this.parser.parseURL(feedUrl);
            return feed.items.map(item => ({
                title: item.title ?? '',
                link: item.link ?? '',
                pubDate: item.pubDate,
                source: meta.source,
                category: meta.category,
                language: meta.language,
            }));
        } catch (error) {
            this.logger.error(`❌ [${meta.source}] 수집 실패: ${feedUrl}`, error);
            return [];
        }
    }
}