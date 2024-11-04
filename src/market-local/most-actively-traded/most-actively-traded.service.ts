import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MostActiveTradeDto } from "Dtos/Stock/create-stock-data.dto";
import { MostActivelyTraded } from "../../entity/MostActivelyTraded.entity";
import { Repository } from "typeorm";

@Injectable()
export class MostActivelyTradedService {
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

  async getMostActiveTradeById(id: string): Promise<MostActivelyTraded> {
    const trade = await this.mostActiveTradeRepository.findOne({ where: { id } });
    if (!trade) {
      throw new NotFoundException(`Most actively traded stock with ID ${id} not found`);
    }
    return trade;
  }

  async updateMostActiveTrade(id: string, mostActiveTradeData: Partial<MostActiveTradeDto>): Promise<MostActivelyTraded> {
    await this.mostActiveTradeRepository.update(id, mostActiveTradeData);
    return this.getMostActiveTradeById(id); // Reuse the method here
  }

  async deleteMostActiveTrade(id: string): Promise<void> {
    await this.mostActiveTradeRepository.delete(id);
  }
}
