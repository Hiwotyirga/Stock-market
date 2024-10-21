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
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { MediaModule } from './news/media/media.module';
import { MediaEntity } from './Entity/Media.entity';
import { StockModule } from './market-local/market-local.module';
import { Stock } from './Entity/stock.entity';
import { StockDataList } from './Entity/StockList.entity';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionData } from './Entity/TransactionData.enety';
import { Trade } from './Entity/trade.entity';
import { ActionModule } from './news/action/action.module';
import { Comment } from './Entity/comment.entity';

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
      entities: [
        User,
        MediaEntity,
        Stock,
        StockDataList,
        TransactionData,
        Trade,
        Comment,
      ],
      synchronize: false,
     
    }),
    TypeOrmModule.forFeature([
      User,
      MediaEntity,
      Stock,
      StockDataList,
      TransactionData,
      Trade,
      Comment,
    ]),
    AuthModule,
    UsersModule,

    MulterModule.register({
      dest: './uploads',
    }),
    MediaModule,
    StockModule,
    StockModule,

    TransactionModule,

    ActionModule,
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
