export interface FeedProvider {
  supports(type: string): boolean;
  fetch(config: {
    url: string;
    source: string;
    language: string;
    [key: string]: any;
  }): Promise<Array<{
    url: string;
    title: string;
    pubDate: string;
    source: string;
    content: string;
    imageUrl: string;
    language: string;
  }>>;
}
