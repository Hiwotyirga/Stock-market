// src/stock/stock.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockService } from './market-local.service';
import { StockController } from './market-local.controller';
import { Stock } from 'src/Entity/stock.entity';
import { StockDataList } from 'src/Entity/StockList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockDataList])],
  providers: [StockService],
  controllers: [StockController],
})
export class StockModule {}
