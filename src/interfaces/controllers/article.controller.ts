import {Controller, Get, Param, Query, ParseIntPipe} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetArticleUseCase} from '@/application/article/get-article.usecase';
import {ListArticlesUseCase} from '@/application/article/list-articles.usecase';
import {ArticleDto} from '../dto/article.dto';
import {SearchArticlesUseCase} from "@/application/article/search-articles.usecase";
import {IncrementArticleViewsUseCase} from "@/application/article/increment-views.usecase";


@ApiTags('articles')
@Controller('articles')
export class ArticleController {
    constructor(
        private readonly getArticle: GetArticleUseCase,
        private readonly listArticles: ListArticlesUseCase,
        private readonly searchArticles: SearchArticlesUseCase,
        private readonly incrementViews: IncrementArticleViewsUseCase,
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

}
