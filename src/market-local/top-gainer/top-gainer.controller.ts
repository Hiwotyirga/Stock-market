import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TopGainerDto,} from "../../Dtos/Stock/create-stock-data.dto";
import { TopGainerService } from "./top-gainer.service";
import { TopGainer } from "../../entity/TopGainer.entity";



@Controller('top-gainer')
export class TopGainerController {

    constructor(private readonly localStockService: TopGainerService) {}

  @Post('top-gainers')
  async addTopGainer(@Body() topGainerData: TopGainerDto): Promise<TopGainer> {
    return this.localStockService.addTopGainer(topGainerData);
  }

  @Get('most-active-trades/:id')  // New endpoint for getting a trade by ID
  async getMostActiveTradeById(@Param('id') id: string): Promise<TopGainer> {
    return this.localStockService.getMostActiveTradeById(id);
  }


  // Read endpoints
  @Get('top-gainers')
  async getTopGainers(): Promise<TopGainer[]> {
    return this.localStockService.getTopGainers();
  }

  // Update endpoints
  @Put('top-gainers/:id')
  async updateTopGainer(@Param('id') id: string, @Body() topGainerData: Partial<TopGainerDto>): Promise<TopGainer> {
    return this.localStockService.updateTopGainer(id, topGainerData);
  }

  // Delete endpoints
  @Delete('top-gainers/:id')
  async deleteTopGainer(@Param('id') id: string): Promise<void> {
    return this.localStockService.deleteTopGainer(id);
  }


}
