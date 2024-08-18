import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NewService } from './new.service';
import { NewController } from './new.controller';

@Module({
  imports: [HttpModule],
  providers: [NewService],
  controllers: [NewController],
})
export class NewModule {}
