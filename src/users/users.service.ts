import { Injectable } from '@nestjs/common';
import { User } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(name: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ name });  // Adjust based on your TypeORM version
  }
}
