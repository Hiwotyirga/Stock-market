import { Injectable } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './Dtos/User/UserCreateDto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Roles } from './Authorization/roles.decorator';
import { Role } from './Authorization/role.enum';
import { RoleGuard } from './Authorization/roles.guard';
import { UsersModule } from './users/users.module';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    try {
      const user = this.userRepository.create(userCreateDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(`Failed to create User: ${error.message}`);
    }
  }
  
  async findAlluser(): Promise<User[]> {
      const users = await this.userRepository.find();
      return users;
     
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user; 
  }
  


  async updateUser(
    userId: string,
    userUpdateDto: Partial<UserCreateDto> 
  ): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new Error('User not found'); 
    }
  
    Object.keys(userUpdateDto).forEach((key) => {
      if (userUpdateDto[key] !== undefined && userUpdateDto[key] !== null) {
        user[key] = userUpdateDto[key];
      }
    });
  
    // Save the updated user to the database
    return this.userRepository.save(user);
  }
  

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }
  async countUsers(): Promise<number> {
    return this.userRepository.count();
  }
 
}
