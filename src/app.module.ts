// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { Profile } from './Entity/profile.entity';
import { ArticlesModule } from './articles/articles.module';
import { ArticleService } from './articles/articles.service';
import { Article } from './Entity/Article.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { Nameentitiy } from './Entity/name.entity';
import { APP_GUARD } from '@nestjs/core';
import { FileEntity } from './Entity/FileEntity .entity';
import { ImageModule } from './news/image/image.module';
import { VideoModule } from './news/video/video.module';
import { VideoEntity } from './Entity/VideoEntity.entity';
import { MediaModule } from './news/media/media.module';
import { MediaEntity } from './Entity/Media.enetity';
import { StockModule } from './stock/stock.module';
import { MarketModule } from './market/market.module';


@Module({
  imports: [
  
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'selam',
      database: 'StockMarket',
      entities: [User, Profile, Article, Nameentitiy, FileEntity, VideoEntity, MediaEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Profile, Article, Nameentitiy, FileEntity, VideoEntity, MediaEntity]),
    AuthModule,
    UsersModule,
  
    MulterModule.register({
      dest: './uploads',
    }),
    ArticlesModule,
    ImageModule,
    VideoModule,
    MediaModule,
    StockModule,
    MarketModule,
  ],
  controllers: [AppController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
