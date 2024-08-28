import { Module } from '@nestjs/common';
import { ArticleService } from './articles.service';
import { Article } from 'src/Entity/Article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles.controller';
// import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UsersModule],
  providers: [ArticleService, AuthGuard],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
