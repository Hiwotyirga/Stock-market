import { Module } from '@nestjs/common';
import { TopGainerController } from './top-gainer.controller';
import { TopGainerService } from './top-gainer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopGainer } from '../../entity/TopGainer.entity';

@Module({

  imports: [TypeOrmModule.forFeature([TopGainer]),

],
  controllers: [TopGainerController],
  providers: [TopGainerService]
})
export class TopGainerModule {}
