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
// import { StockMarketModule } from './stock/stock.module';
import { StockDataList } from './Entity/StockList.entity';
// import { MarketModule } from './market/market.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { WatchlistItem } from './Entity/WatchlistItem.entity';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionData } from './Entity/TransactionData.enety';
import { Trade } from './Entity/trade.entity';

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
      entities: [User, MediaEntity, Stock , StockDataList, WatchlistItem, TransactionData,Trade],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, MediaEntity, Stock, StockDataList, WatchlistItem,TransactionData,Trade]),
    AuthModule,
    UsersModule,
  
    MulterModule.register({
      dest: './uploads',
    }),
    MediaModule,
    StockModule,
    StockModule,

    WatchlistModule,
    TransactionModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
