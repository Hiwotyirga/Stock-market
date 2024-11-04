import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {TopLoserDto } from "Dtos/Stock/create-stock-data.dto";
// import { MostActivelyTraded } from "../entity/MostActivelyTraded.entity";
// import { TopGainer } from "../entity/TopGainer.entity";
import { TopLoser } from "../../entity/TopLoser.entity";
import { Repository } from "typeorm";

@Injectable()
export class TopLoserService {
    constructor(
        @InjectRepository(TopLoser)
        private readonly topLoserRepository: Repository<TopLoser>,
      ) {}

      async getTopLosers(): Promise<TopLoser[]> {
        return this.topLoserRepository.find();
      }
    
      async addTopLoser(topLoserData: TopLoserDto): Promise<TopLoser> {
        const topLoser = this.topLoserRepository.create(topLoserData);
        return this.topLoserRepository.save(topLoser);
      }
    
      async updateTopLoser(id: string, topLoserData: Partial<TopLoserDto>): Promise<TopLoser> {
        await this.topLoserRepository.update(id, topLoserData);
        return this.topLoserRepository.findOne({ where: { id } });
      }
      async deleteTopLoser(id: string): Promise<void> {
        await this.topLoserRepository.delete(id);
      }

      async getMostActiveTradeById(id: string): Promise<TopLoser> {
        const trade = await this.topLoserRepository.findOne({ where: { id } });
        if (!trade) {
          throw new NotFoundException(`Most actively traded stock with ID ${id} not found`);
        }
        return trade;
      }
    
      
}
