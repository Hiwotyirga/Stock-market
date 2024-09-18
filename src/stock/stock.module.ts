import { Module } from '@nestjs/common';
import { StockMarketService } from './stock.service';
import { HttpModule } from '@nestjs/axios';
import { StockMarketController } from './stock.controller';

@Module({
  imports: [HttpModule],
  providers: [StockMarketService],
  controllers: [StockMarketController],
})
export class StockMarketModule {}
