import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/Entity/user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async findOne(name: string): Promise<User | undefined> {
    console.log(`Searching for user with username: ${name}`);
    
    const user = await this.userRepository.findOneBy({ name });

    if (user) {
      console.log("User found:", user);
    } else {
      console.log("No user found with the provided username");
    }

    return user;
  }
}
