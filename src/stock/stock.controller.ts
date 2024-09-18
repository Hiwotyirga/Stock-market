import { Controller, Get } from '@nestjs/common';
import { StockMarketService } from './stock.service';

@Controller('stock-market')
export class StockMarketController {
  constructor(private readonly stockMarketService: StockMarketService) {}

  @Get('stock/list')
  async getStockMarketData() {
    return this.stockMarketService.getStockData();
  }
}
