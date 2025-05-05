export class ArticleDto {
  id!: number;
  url!: string;
  title!: string;
  pubDate!: Date;
  source!: string;
  category!: string;
  language!: string;
  shortSummary!: string;
  longSummary!: string;
  imageUrl!: string;
  context!: string | null;
  createdAt!: Date;
  embedding!: number[] | null;
}
