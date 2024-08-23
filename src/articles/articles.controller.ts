// src/articles/articles.controller.ts
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ArticleService } from './articles.service';
import { ArticleDtos } from '../Dtos/ArticleDtos';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Article } from 'src/Entity/Article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createArticle(@Body() articleDtos: ArticleDtos): Promise<Article> {

    return this.articleService.createArticle(articleDtos);
  }
}
