import { Module } from '@nestjs/common';
import { TopLoserController } from './top-loser.controller';
import { TopLoserService } from './top-loser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopLoser } from '../../entity/TopLoser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopLoser]),

],
  controllers: [TopLoserController],
  providers: [TopLoserService]
})
export class TopLoserModule {}
