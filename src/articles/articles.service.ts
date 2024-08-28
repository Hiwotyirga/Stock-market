// src/articles/articles.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from 'src/Entity/Article.entity';
import { ArticleDtos } from '../Dtos/ArticleDtos';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(articleDtos: ArticleDtos): Promise<Article> {
    try {
      const article = this.articleRepository.create(articleDtos);
      return await this.articleRepository.save(article);
    } catch (error) {
      console.error('Error creating article:', error);
      throw new InternalServerErrorException('Failed to create article');
    }
  }
}
