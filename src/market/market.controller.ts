import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly stockService: MarketService) {}

  @Get('stocks')
  async getMergedStockData(): Promise<any> {
    return this.stockService.getMergedStockData();
  }
}
