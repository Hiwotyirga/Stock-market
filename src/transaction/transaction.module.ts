import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionData } from 'src/Entity/TransactionData.enety';
import { User } from 'src/Entity/user.entity';
import { Trade } from 'src/Entity/trade.entity';
import { StockDataList } from 'src/Entity/StockList.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionData, User, Trade, StockDataList]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
