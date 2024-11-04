import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MostActiveTradeDto } from "../../Dtos/Stock/create-stock-data.dto";
import { MostActivelyTradedService } from "./most-actively-traded.service";
import { MostActivelyTraded } from "../../entity/MostActivelyTraded.entity";

@Controller('most-actively-traded')
export class MostActivelyTradedController {
  constructor(private readonly localStockService: MostActivelyTradedService) {}

  @Post('most-active-trades')
  async addMostActiveTrade(@Body() mostActiveTradeData: MostActiveTradeDto): Promise<MostActivelyTraded> {
    return this.localStockService.addMostActiveTrade(mostActiveTradeData);
  }
  
  @Get('most-active-trades')
  async getMostActiveTrades(): Promise<MostActivelyTraded[]> {
    return this.localStockService.getMostActiveTrades();
  }
  
  @Get('most-active-trades/:id')  // New endpoint for getting a trade by ID
  async getMostActiveTradeById(@Param('id') id: string): Promise<MostActivelyTraded> {
    return this.localStockService.getMostActiveTradeById(id);
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
