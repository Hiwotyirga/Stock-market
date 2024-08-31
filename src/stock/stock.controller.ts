import { Controller, Get, Query } from '@nestjs/common';
import { StockGateway } from './stock.gateway';

@Controller('stock')
export class StockController {
  constructor(private stockGateway: StockGateway) {}

  @Get('real-time')
  getRealTimeStock(@Query('symbol') symbol: string) {
    this.stockGateway.sendRealTimeUpdates(symbol);
    return { message: `Real-time updates for ${symbol} initiated` };
  }
}