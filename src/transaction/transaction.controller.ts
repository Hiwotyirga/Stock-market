import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from 'src/Dtos/transaction/create-transaction.dto';
import { UpdateTransactionDto } from 'src/Dtos/transaction/update-transaction.dto';
import { TransactionData } from 'src/Entity/TransactionData.enety';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() req: any,
  ): Promise<TransactionData> {
    const userId = req.user.sub; // Extract user ID from the JWT payload
    return this.transactionService.createTransaction(
      createTransactionDto,
      userId,
    ); // Pass the user ID to the service
  }

  @Get()
  async findAll(): Promise<TransactionData[]> {
    return this.transactionService.getAllTransactions();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TransactionData> {
    return this.transactionService.getTransactionById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<TransactionData> {
    return this.transactionService.updateTransaction(id, updateTransactionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.transactionService.deleteTransaction(id);
  }
}
