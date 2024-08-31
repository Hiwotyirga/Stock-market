import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockGateway } from './stock.gateway';

@Module({
  controllers: [StockController],
  providers: [StockService, StockGateway],
})
export class StockModule {}