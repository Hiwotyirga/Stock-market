import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/Entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<User> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersService.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; role: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      role: user.role,
    };
  }

  // GET all registered users
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  // DELETE a user by their ID
  async deleteUser(userId: string): Promise<void> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    await this.usersService.removeUser(userId);
  }

  // Find one user by ID
  async findOneUser(userId: string): Promise<User> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
  // PUT update a user by their ID
  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // If the password is being updated, hash it before saving
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Update the user
    return this.usersService.updateUser(userId, updateData);
  }

  // Use the UsersService to count users
  async countUsers(): Promise<number> {
    return this.usersService.countUsers();
  }
}
