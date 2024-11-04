import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopGainerDto} from "../../Dtos/Stock/create-stock-data.dto";
import { TopGainer } from "../../entity/TopGainer.entity";
// import { MostActivelyTraded } from "../entity/MostActivelyTraded.entity";
// import { TopGainer } from "../entity/TopGainer.entity";
// import { TopLoser } from "../entity/TopLoser.entity";
import { Repository } from "typeorm"

@Injectable()
export class TopGainerService {

    constructor(
        @InjectRepository(TopGainer)
        private readonly topGainerRepository: Repository<TopGainer>,
        
      ) {}
    
      // Create methods
      async addTopGainer(topGainerData: TopGainerDto): Promise<TopGainer> {
        const topGainer = this.topGainerRepository.create(topGainerData);
        return this.topGainerRepository.save(topGainer);
      }
    

      // Read methods
      async getTopGainers(): Promise<TopGainer[]> {
        return this.topGainerRepository.find();
      }
    
      // Update methods
      async updateTopGainer(id: string, topGainerData: Partial<TopGainerDto>): Promise<TopGainer> {
        await this.topGainerRepository.update(id, topGainerData);
        return this.topGainerRepository.findOne({ where: { id } });
      }
    

      // Delete methods
      async deleteTopGainer(id: string): Promise<void> {
        await this.topGainerRepository.delete(id);
      }

      
      async getMostActiveTradeById(id: string): Promise<TopGainer> {
        const trade = await this.topGainerRepository.findOne({ where: { id } });
        if (!trade) {
          throw new NotFoundException(`Most actively traded stock with ID ${id} not found`);
        }
        return trade;
      }

      
}
