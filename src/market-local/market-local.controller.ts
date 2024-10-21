import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StockService } from './market-local.service';
import { StockDataList } from 'src/Entity/StockList.entity';
import { StockDataDto } from 'src/Dtos/Stock/create-stock-data.dto';

@Controller('local-market')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('stocks')
  async getAllStockData(): Promise<StockDataList[]> {
    return this.stockService.getStockData();
  }

  @Post('stocks')
  async createStockData(
    @Body() createStockDataDto: StockDataDto,
  ): Promise<StockDataList> {
    return this.stockService.createStockData(createStockDataDto);
  }
  @Get('stocks/:id')
  async getOneStockData(@Param('id') id: string): Promise<StockDataList> {
    return this.stockService.getOneStockData(id);
  }

  @Put('stocks/:id')
  async updateStockData(
    @Param('id') id: string,
    @Body() updateStockDataDto: StockDataDto,
  ): Promise<StockDataList> {
    return this.stockService.updateStockData(id, updateStockDataDto);
  }

  @Delete('stocks/:id')
  async deleteStockData(@Param('id') id: string): Promise<void> {
    return this.stockService.deleteStockData(id);
  }
}
