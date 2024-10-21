import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StockDataList } from 'src/Entity/StockList.entity';
import { StockDataDto } from 'src/Dtos/Stock/create-stock-data.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockDataList)
    private readonly stockRepository: Repository<StockDataList>,
  ) {}

  // GET method
  async getStockData(): Promise<StockDataList[]> {
    return this.stockRepository.find();
  }
  // GET:ID method
  async getOneStockData(id: string): Promise<StockDataList> {
    const stock = this.stockRepository.findOne({ where: { id: id } });
    if (!stock) {
      throw new NotFoundException('Stock with Id no found');
    }
    return stock;
  }
  // POST method
  async createStockData(stockDataDto: StockDataDto): Promise<StockDataList> {
    const stockData = this.stockRepository.create({
      ...stockDataDto,
      lastUpdated: new Date(), // Set the current date and time
    });
    return this.stockRepository.save(stockData);
  }

  // PUT method
  async updateStockData(
    id: string,
    stockDataDto: StockDataDto,
  ): Promise<StockDataList> {
    const existingStock = await this.stockRepository.findOne({ where: { id } });
    if (!existingStock) {
      throw new NotFoundException(`Stock data with ID ${id} not found`);
    }

    // Update fields
    Object.assign(existingStock, stockDataDto, { lastUpdated: new Date() }); // Set the current date and time
    return this.stockRepository.save(existingStock);
  }

  // DELETE method
  async deleteStockData(id: string): Promise<void> {
    const result = await this.stockRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Stock data with ID ${id} not found`);
    }
  }
}
