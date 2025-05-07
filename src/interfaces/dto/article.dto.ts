import { ApiProperty } from '@nestjs/swagger';

export class ArticleDto {
  @ApiProperty({ description: '고유 식별자', example: 123 })
  id!: number;

  @ApiProperty({ description: '기사 원문 URL', example: 'https://example.com/article/1' })
  url!: string;

  @ApiProperty({ description: '기사 제목', example: 'AI 기술의 미래' })
  title!: string;

  @ApiProperty({ description: '발행 일시', example: '2025-05-06T12:00:00.000Z' })
  pubDate!: Date;

  @ApiProperty({ description: '기사 제공 출처', example: '연합뉴스' })
  source!: string;

  @ApiProperty({ description: '분류된 카테고리', example: 'tech' })
  category!: string;

  @ApiProperty({ description: '언어', example: 'korean' })
  language!: string;

  @ApiProperty({ description: '짧은 요약', example: 'AI는 ...' })
  shortSummary!: string;

  @ApiProperty({ description: '상세 요약', example: '인공지능 기술은 ...' })
  longSummary!: string;

  @ApiProperty({ description: '대표 이미지 URL', example: 'https://example.com/image.jpg' })
  imageUrl!: string;

  @ApiProperty({ description: '본문 내용 (원문)', nullable: true, example: '전체 기사 본문...' })
  context!: string | null;

  @ApiProperty({ description: '저장 일시', example: '2025-05-06T12:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ description: '임베딩 벡터', type: [Number], nullable: true })
  embedding!: number[] | null;
}