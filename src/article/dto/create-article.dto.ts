export interface CreateArticleDto {
    title: string;
    pubDate: Date;
    source: string;
    category: string;
    language: string;
    url: string;
    urlHash: string;
    context?: string | null;
    imageUrl?: string | null;
    shortSummary?: string | null;
    longSummary?: string | null;
    embedding?: number[];
}