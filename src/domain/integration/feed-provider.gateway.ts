export interface FeedProvider {
  supports(type: string): boolean;
  fetch(config: {
    url: string;
    sourceTypeId: number
    sourceTypeName: string;
    language: string;
    [key: string]: any;
  }): Promise<Array<{
    url: string;
    title: string;
    pubDate: string;
    sourceTypeName: string;
    sourceTypeId: number;
    content: string;
    imageUrl: string;
    language: string;
  }>>;
}
