import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionData } from 'src/Entity/TransactionData.enety';
import { CreateTransactionDto } from 'src/Dtos/transaction/create-transaction.dto';
import { UpdateTransactionDto } from 'src/Dtos/transaction/update-transaction.dto';
import { User } from 'src/Entity/user.entity'; // Adjust import path if necessary

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionData)
    private readonly transactionRepository: Repository<TransactionData>,
    @InjectRepository(User) // Inject User repository to fetch user
    private readonly userRepository: Repository<User>,
  ) {}

  async createTransaction(dto: CreateTransactionDto, userId: string): Promise<TransactionData> {
    const user = await this.userRepository.findOne({ where: { id: userId } }); // Fetch the full User entity by ID
    if (!user) {
      throw new Error('User not found'); // Handle user not found
    }

    const transaction = this.transactionRepository.create({
      ...dto,
      user, // Set the user in the transaction
    });

    return this.transactionRepository.save(transaction);
  }

  async getAllTransactions(): Promise<TransactionData[]> {
    return this.transactionRepository.find({ relations: ['user'] });
  }

  async getTransactionById(id: string): Promise<TransactionData> {
    return this.transactionRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async updateTransaction(id: string, dto: UpdateTransactionDto): Promise<TransactionData> {
    await this.transactionRepository.update(id, dto);
    return this.getTransactionById(id); // return updated transaction
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
