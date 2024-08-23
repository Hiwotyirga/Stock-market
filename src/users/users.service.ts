import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/Entity/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User) private readonly userRepository: Repository<User>;

  async findOne(name: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ name });
  }
}
