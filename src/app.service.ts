import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './Entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './Dtos/User/UserCreateDtos';
import { UserUpdateDto } from './Dtos/User/UserUpdateDtos';
// import { AdminRegister } from './Entity/Content/AdminRegister.entity';
import { Role } from './Entity/Role.entity';
import { AdminRegister } from './Entity/AdminRegister.entity';
import { AdminRegisterCreateDto } from './Dtos/Admin/AdminRegisterCreateDto';
import { RolesDtos } from './Dtos/Admin/RolesDtos';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly adminRepository: Repository<AdminRegister>,
    @InjectRepository(AdminRegister)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(userCreateDto: UserCreateDto): Promise<User> {
    const user = this.userRepository.create(userCreateDto);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(
    userId: string,
    userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, userUpdateDto);
    return this.userRepository.save(user);
  }

  async createAdmin(adminRegisterDtos: AdminRegisterCreateDto): Promise<AdminRegister> {
    const { name, email, password, roleId } = adminRegisterDtos;
    
    // Fetch the role based on the provided roleId
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
  
    if (!role) {
      throw new Error('Role not found');
    }
  
    // Create a new admin entity
    const admin = this.adminRepository.create({
      name,
      email,
      password,
      roles: [role], // assuming roles is an array
    });
  
    // Save the admin entity to the database
    return this.adminRepository.save(admin);
  }
  
  async RoleCreate(roleCreateDtos: RolesDtos): Promise<Role> {
    const roles = this.roleRepository.create(roleCreateDtos);
    return this.roleRepository.save(roles);
  }
}
