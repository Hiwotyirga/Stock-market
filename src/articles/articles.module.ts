import { Module } from '@nestjs/common';
import { ArticleService } from './articles.service';
import { Article } from 'src/Entity/Article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles.controller';
// import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
