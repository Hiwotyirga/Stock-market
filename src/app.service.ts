import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './Dtos/User/UserCreateDtos';
import { UserUpdateDto } from './Dtos/User/UserUpdateDtos';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userCreateDto: UserCreateDto): Promise<User> {
    const user = this.userRepository.create(userCreateDto);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(userId: string, userUpdateDto: UserUpdateDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    Object.assign(user, userUpdateDto);
    return this.userRepository.save(user);
  }
  
  
}
