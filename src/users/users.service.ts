import { Injectable } from '@nestjs/common';
import { User } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRegister } from 'src/Entity/AdminRegister.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(AdminRegister) // Corrected this line
    private readonly adminRepository: Repository<AdminRegister>,
  ) {}

  async findOne(name: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ name });
  }

  async findOneAdmin(name: string): Promise<AdminRegister | undefined> {
    return this.adminRepository.findOneBy({ name });
  }
  // async findOneContent(name: string): Promise<AdminRegister | undefined> {
  //   return this.adminRepository.findOneBy({ name });
  // }
}
