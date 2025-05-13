import {Controller, Get, Param, Query, Post, Body} from '@nestjs/common';
import {GetArticleUseCase} from '@/application/article/get-article.usecase';
import {ListArticlesUseCase} from '@/application/article/list-articles.usecase';
import {SaveArticleUseCase} from '@/application/article/save-article.usecase';
import {ArticleDto} from '../dto/article.dto';
import {SearchArticlesUseCase} from "@/application/article/search-articles.usecase";
import {ApiTags} from "@nestjs/swagger";


@ApiTags('articles')
@Controller('articles')
export class ArticleController {
    constructor(
        private readonly getArticle: GetArticleUseCase,
        private readonly listArticles: ListArticlesUseCase,
        private readonly searchArticles: SearchArticlesUseCase,
    ) {
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<ArticleDto> {
        return this.getArticle.execute(Number(id));
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
}
