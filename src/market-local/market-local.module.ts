import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStockService } from './market-local.service';
import { MostActivelyTraded } from '../Entity/MostActivelyTraded.entity';
import { LocalStockController } from './market-local.controller';
import { MostActivelyTradedModule } from './most-actively-traded/most-actively-traded.module';


@Module({
  imports: [TypeOrmModule.forFeature([MostActivelyTraded]), MostActivelyTradedModule,

],
  providers: [LocalStockService],
  exports: [LocalStockService],
  controllers: [LocalStockController],
})
export class StockModule {}
