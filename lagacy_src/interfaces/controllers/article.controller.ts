import {Controller, Get, Param, Query, ParseIntPipe} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetArticleUseCase} from '@/application/article/get-article.usecase';
import {ListArticlesUseCase} from '@/application/article/list-articles.usecase';
import {ArticleDto} from '../dto/article.dto';
import {SearchArticlesUseCase} from "@/application/article/search-articles.usecase";
import {IncrementArticleViewsUseCase} from "@/application/article/increment-views.usecase";
import {GetTrendingArticlesByCategoryUseCase} from "@/application/article/get-trending-articles.usecase";
import {TrendingArticleResponseDto} from "@/interfaces/dto/trending-article-response.dto";


@ApiTags('articles')
@Controller('articles')
export class ArticleController {
    constructor(
        private readonly getArticle: GetArticleUseCase,
        private readonly listArticles: ListArticlesUseCase,
        private readonly searchArticles: SearchArticlesUseCase,
        private readonly incrementViews: IncrementArticleViewsUseCase,
        private readonly getTrending: GetTrendingArticlesByCategoryUseCase,
    ) {
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<ArticleDto> {
        return this.getArticle.execute(id);
    }

    @Get()
    findAll(@Query('category') categoryId?: number): Promise<ArticleDto[]> {
        return this.listArticles.execute(categoryId);
    }

    @Get('search')
    search(@Query('q') q: string, @Query('limit') limit?: string): Promise<ArticleDto[]> {
        const l = limit ? parseInt(limit, 10) : undefined;
        return this.searchArticles.execute(q, l);
    }

    @Get(':id')
    async getAndCount(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArticleDto> {
        // 1) 조회 수 증가
        const newViews = await this.incrementViews.execute(id);

        // 2) 글 자체 정보 가져오기 (기존 GetArticleUseCase 활용)
        const article = await this.getArticle.execute(id);

        // 3) DTO에 views 정보 포함
        return {
            ...article,
            views: newViews,
        };
    }


    @Get('category/:categoryId/trending')
    @ApiOperation({summary: '카테고리별 조회수 상위 N개 글 조회'})
    @ApiParam({name: 'categoryId', type: Number, example: 3})
    @ApiQuery({name: 'limit', required: false, example: 10})
    @ApiResponse({
        status: 200,
        description: '인기도 상위 글 리스트',
        type: TrendingArticleResponseDto,
        isArray: true,
    })
    async getTrendingByCategory(
        @Param('categoryId', ParseIntPipe) categoryId: number,
        @Query('limit', ParseIntPipe) limit = 10,
    ): Promise<TrendingArticleResponseDto[]> {
        const articles = await this.getTrending.execute(categoryId, limit);
        return articles.map((a, idx) => ({
            id: a.id,
            title: a.title,
            url: a.url,
            pubDate: a.pubDate,
            views: a.views,
            rank: idx + 1,
        }));
    }
}
