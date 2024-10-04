import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionData } from 'src/Entity/TransactionData.enety';
import { User } from 'src/Entity/user.entity';
import { Trade } from 'src/Entity/trade.entity';
import { StockDataList } from 'src/Entity/StockList.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionData, User, Trade, StockDataList]), // Add all necessary entities
    AuthModule, // For AuthGuard and authentication-related logic
    UsersModule, // For UsersService access in AuthGuard
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
