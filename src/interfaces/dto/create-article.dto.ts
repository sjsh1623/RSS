import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    description: '기사 원문 URL',
    example: 'https://example.com/article/123',
  })
  url!: string;

  @ApiProperty({
    description: '기사 제목',
    example: 'AI가 바꿀 미래 기술 트렌드',
  })
  title!: string;

  @ApiProperty({
    description: '발행 일시',
    example: '2025-05-06T12:00:00.000Z',
  })
  pubDate!: Date;

  @ApiProperty({
    description: '기사 제공 출처',
    example: '연합뉴스',
  })
  typeName!: string;

  @ApiProperty({
    description: '기사 제공 출처의 키 값',
    example: '5',
  })
  providerId!: string;


  @ApiProperty({
    description: '기사 본문 내용 (원문)',
    example: '인공지능(AI)은 ...',
  })
  content!: string;

  @ApiProperty({
    description: '대표 이미지 URL',
    example: 'https://example.com/images/article-123.jpg',
  })
  imageUrl!: string;

  @ApiProperty({
    description: '언어 코드',
    example: 'korean',
  })
  language!: string;
}