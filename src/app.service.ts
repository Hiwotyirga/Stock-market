// src/app.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './Dtos/User/UserCreateDtos';
import { AdminRegister } from './Entity/AdminRegister.entity';
import { AdminRegisterCreateDto } from './Dtos/Admin/AdminRegisterCreateDto';
import { Role } from './Entity/Role.entity';
import { RolesDtos } from './Dtos/Admin/RolesDtos';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AdminRegister)
    private readonly adminRepository: Repository<AdminRegister>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    const user = this.userRepository.create(userCreateDto);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(userId: string, userUpdateDto: UserCreateDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, userUpdateDto);
    return this.userRepository.save(user);
  }

  async createAdmin(
    adminRegisterDtos: AdminRegisterCreateDto,
  ): Promise<AdminRegister> {
    const { name, email, password } = adminRegisterDtos;

    // Fetch the role based on the provided roleId from the URL
    // const role = await this.roleRepository.findOne({ where: { id: roleId } });

    // if (!role) {
    //   throw new NotFoundException('Role not found');
    // }

    // Create a new admin entity with the fetched role
    const admin = this.adminRepository.create({
      name,
      email,
      password,
      // roles: [role], // roles is now an array with a single Role entity
    });

    // Save the admin entity to the database
    return this.adminRepository.save(admin);
  }
  
  // async createRole(roleCreateDtos: RolesDtos): Promise<Role> {
  //   const role = this.roleRepository.create(roleCreateDtos);
  //   return this.roleRepository.save(role);
  // }

  // async findRole(): Promise<Role[]>{
  //   return this.roleRepository.find()

  // }

  async findAdmin(): Promise<AdminRegister[]>{
    return this.adminRepository.find()
  }
}
