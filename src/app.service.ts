
import { Injectable } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './Dtos/User/UserCreateDtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Nameentitiy } from './Entity/name.entity';
import { NameDtos } from './Dtos/User/nameDtos';
import { ConflictException } from '@nestjs/common';

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
      const nameEntity = this.nameRepository.create(nameDto);
      return await this.nameRepository.save(nameEntity);
    } catch (error) {
      throw new Error(`Failed to create Nameentitiy: ${error.message}`);
    }
  }
  

  

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    const { email, name, roles  } = userCreateDto;

    // Check if a user with the same name or email already exists
    const existingUser = await this.userRepository.findOne({
      where: [{  email }, { name }],
    });

    if (existingUser) {
      throw new ConflictException('A user with this name or email already exists.');
    }

    // If no user exists, proceed to create the new user
    const user = this.userRepository.create({
      ...userCreateDto,
      rolename: roles || 'admin', // Use 'roles' field or default to 'admin'
    });

    return this.userRepository.save(user);
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
