// import { Controller, Get } from '@nestjs/common';
// import { MarketService } from './market.service';
// import { CombinedStockData } from 'src/Dtos/Stock/combined-stock-data.dto';

// @Controller('stock-market')
// export class MarketController {
//   constructor(private readonly marketService: MarketService) {}

//   @Get('stocks')
//   async getAllStockData(): Promise<CombinedStockData[]> {
//     return this.marketService.getCombinedMarketData();
//   }
// }


import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('stock-market')
export class MarketController {
  constructor(private readonly stockMarketService: MarketService) {}

  @Get('stock/list')
  async getStockList() {
    return this.stockMarketService.getStockList();
  }
}
