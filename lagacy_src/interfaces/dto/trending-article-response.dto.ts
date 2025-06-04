import { ApiProperty } from '@nestjs/swagger';

export class TrendingArticleResponseDto {
    @ApiProperty({ example: 1, description: '게시글 고유 ID' })
    id: number;

    @ApiProperty({ example: '인기 글 제목', description: '제목' })
    title: string;

    @ApiProperty({ example: 'https://example.com/news/42', description: '원문 URL' })
    url: string;

    @ApiProperty({ example: '2025-05-20T12:34:56.000Z', description: '게시 일시' })
    pubDate: Date;

    @ApiProperty({ example: 1234, description: '누적 조회수' })
    views: number;

    @ApiProperty({ example: 1, description: '인기도 순위 (1이 가장 높음)' })
    rank: number;
}