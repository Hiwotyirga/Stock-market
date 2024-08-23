// // src/app.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { User } from './Entity/user.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserCreateDto } from './Dtos/User/UserCreateDtos';

import { Injectable } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './Dtos/User/UserCreateDtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Nameentitiy } from './Entity/name.entity';
import { NameDtos } from './Dtos/User/nameDtos';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Nameentitiy)
    private readonly nameRepository: Repository<Nameentitiy>,
  ) {}

  async createName(nameDto: NameDtos): Promise<Nameentitiy> {
    try {
      console.log('Received DTO:', nameDto); // Log the incoming DTO
      const names = this.nameRepository.create(nameDto);
      return await this.nameRepository.save(names);
    } catch (error) {
      throw new Error(`Failed to create Nameentitiy: ${error.message}`);
    }
  }

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    const user = this.userRepository.create(userCreateDto);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(
    userId: string,
    userUpdateDto: UserCreateDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }

    Object.assign(user, userUpdateDto);
    return this.userRepository.save(user);
  }
}
