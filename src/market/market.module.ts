import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { HttpModule } from '@nestjs/axios';  // Correct import
import { MarketController } from './market.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockDataList } from 'src/Entity/StockList.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([StockDataList]), HttpModule],
  // imports: [],
  providers: [MarketService],
  controllers: [MarketController],
})
export class MarketModule {}
