import { Module } from '@nestjs/common';
import { MostActivelyTradedController } from './most-actively-traded.controller';
import { MostActivelyTradedService } from './most-actively-traded.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MostActivelyTraded } from '../../entity/MostActivelyTraded.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MostActivelyTraded]),

],
  controllers: [MostActivelyTradedController],
  providers: [MostActivelyTradedService]
})
export class MostActivelyTradedModule {}
