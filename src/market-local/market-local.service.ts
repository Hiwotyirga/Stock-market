import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MostActiveTradeDto} from "Dtos/Stock/create-stock-data.dto";
import { MostActivelyTraded } from "../entity/MostActivelyTraded.entity";
import { Repository } from "typeorm";

@Injectable()
export class LocalStockService {
  constructor(
    @InjectRepository(MostActivelyTraded)
    private readonly mostActiveTradeRepository: Repository<MostActivelyTraded>,
  ) {}
  async addMostActiveTrade(mostActiveTradeData: MostActiveTradeDto): Promise<MostActivelyTraded> {
    const mostActiveTrade = this.mostActiveTradeRepository.create(mostActiveTradeData);
    return this.mostActiveTradeRepository.save(mostActiveTrade);
  }
  async getMostActiveTrades(): Promise<MostActivelyTraded[]> {
    return this.mostActiveTradeRepository.find();
  }
  async updateMostActiveTrade(id: string, mostActiveTradeData: Partial<MostActiveTradeDto>): Promise<MostActivelyTraded> {
    await this.mostActiveTradeRepository.update(id, mostActiveTradeData);
    return this.mostActiveTradeRepository.findOne({ where: { id } });
  }

  async deleteMostActiveTrade(id: string): Promise<void> {
    await this.mostActiveTradeRepository.delete(id);
  }
  
}
