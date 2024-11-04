import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MostActiveTradeDto, TopGainerDto, TopLoserDto } from "../Dtos/Stock/create-stock-data.dto";
import { LocalStockService } from "./market-local.service";
import { TopGainer } from "../entity/TopGainer.entity";
import { TopLoser } from "../entity/TopLoser.entity";
import { MostActivelyTraded } from "../entity/MostActivelyTraded.entity";


@Controller('stocks')
export class LocalStockController {
  constructor(private readonly localStockService: LocalStockService) {}

  @Post('most-active-trades')
  async addMostActiveTrade(@Body() mostActiveTradeData: MostActiveTradeDto): Promise<MostActivelyTraded> {
    return this.localStockService.addMostActiveTrade(mostActiveTradeData);
  }

  @Get('most-active-trades')
  async getMostActiveTrades(): Promise<MostActivelyTraded[]> {
    return this.localStockService.getMostActiveTrades();
  }

  @Put('most-active-trades/:id')
  async updateMostActiveTrade(@Param('id') id: string, @Body() mostActiveTradeData: Partial<MostActiveTradeDto>): Promise<MostActivelyTraded> {
    return this.localStockService.updateMostActiveTrade(id, mostActiveTradeData);
  }


  @Delete('most-active-trades/:id')
  async deleteMostActiveTrade(@Param('id') id: string): Promise<void> {
    return this.localStockService.deleteMostActiveTrade(id);
  }

}
