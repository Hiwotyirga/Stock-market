import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {  TopLoserDto } from "../../Dtos/Stock/create-stock-data.dto";
import { TopLoserService } from "./top-loser.service";
import { TopLoser } from "../../Entity/TopLoser.entity";




@Controller('top-loser')
export class TopLoserController {
    
  constructor(private readonly localStockService:TopLoserService) {}

  @Post('top-losers')
  async addTopLoser(@Body() topLoserData: TopLoserDto): Promise<TopLoser> {
    return this.localStockService.addTopLoser(topLoserData);
  }

  @Get('most-active-trades/:id')  // New endpoint for getting a trade by ID
  async getMostActiveTradeById(@Param('id') id: string): Promise<TopLoser> {
    return this.localStockService.getMostActiveTradeById(id);
  }

  // Read endpoints
  

  @Get('top-losers')
  async getTopLosers(): Promise<TopLoser[]> {
    return this.localStockService.getTopLosers();
  }

//   @Get('most-active-trades')
//   async getMostActiveTrades(): Promise<MostActivelyTraded[]> {
//     return this.localStockService.getMostActiveTrades();
//   }


  @Put('top-losers/:id')
  async updateTopLoser(@Param('id') id: string, @Body() topLoserData: Partial<TopLoserDto>): Promise<TopLoser> {
    return this.localStockService.updateTopLoser(id, topLoserData);
  }

//   @Put('most-active-trades/:id')
//   async updateMostActiveTrade(@Param('id') id: string, @Body() mostActiveTradeData: Partial<MostActiveTradeDto>): Promise<MostActivelyTraded> {
//     return this.localStockService.updateMostActiveTrade(id, mostActiveTradeData);
//   }

  @Delete('top-losers/:id')
  async deleteTopLoser(@Param('id') id: string): Promise<void> {
    return this.localStockService.deleteTopLoser(id);
  }

//   @Delete('most-active-trades/:id')
//   async deleteMostActiveTrade(@Param('id') id: string): Promise<void> {
//     return this.localStockService.deleteMostActiveTrade(id);
//   }



}
