import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockDataList } from 'src/Entity/StockList.entity';

@Module({
  controllers: [MarketController],
  imports: [TypeOrmModule.forFeature([StockDataList])],
  providers: [MarketService]
})
export class MarketModule {}
