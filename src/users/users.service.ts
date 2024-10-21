import { Injectable } from '@nestjs/common';
import { User } from 'src/Entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(userDetails: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userDetails);
    return this.usersRepository.save(user);
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Find a user by ID
  async findById(userId: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  // Get all users
  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Remove a user by ID
  async removeUser(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(userId, updateData);
    return this.findById(userId);
  }

  // Count total number of registered users
  async countUsers(): Promise<number> {
    return this.usersRepository.count();
  }
}
