import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/Entity/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async createNews(newsData: Partial<News>): Promise<News> {
    const news = this.newsRepository.create(newsData);
    return this.newsRepository.save(news);
  }

  async getAllNews(): Promise<News[]> {
    return this.newsRepository.find();
  }

  async getNewsByStockSymbol(stockSymbol: string): Promise<News[]> {
    return this.newsRepository.find({ where: { stockSymbol } });
  }

  async getNewsById(id: number): Promise<News> {
    return this.newsRepository.findOne({ where: { id: id } });
  }
}
