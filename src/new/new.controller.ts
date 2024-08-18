import { Controller, Get, Param } from '@nestjs/common';
import { NewService } from './new.service';

@Controller('new')
export class NewController {
  constructor(private readonly stockService: NewService) {}

  @Get(':symbol')
  async getStockData(@Param('symbol') symbol: string) {
    const stockData = await this.stockService.getNewData(symbol);
    return stockData;
  }
}
