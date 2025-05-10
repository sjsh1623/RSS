export class Article {
  constructor(
    public readonly id: number,
    public readonly url: string,
    public readonly urlHash: string,
    public readonly title: string,
    public readonly pubDate: Date,
    public readonly sourceTypeId: number,
    public readonly category: string,
    public readonly language: string,
    public readonly shortSummary: string,
    public readonly longSummary: string,
    public readonly imageUrl: string,
    public readonly context: string | null,
    public readonly createdAt: Date,
    public readonly embedding: number[] | null,
  ) {}
}
