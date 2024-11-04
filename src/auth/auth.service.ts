import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Entity/user.entity'; 
import { Subscribe } from '../Entity/Subscribe.enetity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Subscribe)
    private subscribeRepository: Repository<Subscribe>,
  ) {}

  // User Registration
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

  // Subscriber Registration
  async registerSubscriber(
    name: string,
    email: string,
    password: string,
    paymentMethodId: string,
  ): Promise<Subscribe> {
    const existingSubscriber = await this.subscribeRepository.findOne({ where: { email } });
    if (existingSubscriber) {
      throw new BadRequestException('Subscriber with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSubscriber = this.subscribeRepository.create({
      name,
      email,
      password: hashedPassword, // Use the hashed password
      paymentMethod: { id: paymentMethodId }, // Correctly associate the payment method
    });

    return this.subscribeRepository.save(newSubscriber);
  }

  // Subscriber Login
  async loginSubscriber(
    name: string,
    password: string,
  ): Promise<{ access_token: string; message: string }> {
    const subscriber = await this.subscribeRepository.findOne({ where: { name } });

    if (!subscriber) {
      throw new UnauthorizedException('Invalid subscriber name');
    }

    const passwordMatch = await bcrypt.compare(password, subscriber.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid subscriber credentials');
    }

    const payload = { sub: subscriber.id, email: subscriber.email };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      message: 'Subscriber logged in successfully',
    };
  }

  // User Login
  async login(
    name: string, // This could be an email or username depending on your logic
    password: string,
): Promise<{ access_token: string; role: string }> {
    const user = await this.usersService.findByEmail(name); // Ensure this matches your method

    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: user.id, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
        access_token,
        role: user.role,
    };
}


  // Get all registered users
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  // Delete a user by their ID
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

  // Update a user by their ID
  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // If the password is being updated, hash it before saving
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return this.usersService.updateUser(userId, updateData);
  }

  // Count total registered users
  async countUsers(): Promise<number> {
    return this.usersService.countUsers();
  }

  // CRUD Operations for Subscriber

  // Get all subscriptions
  async getAllSubscribers(): Promise<Subscribe[]> {
    return this.usersService.findAllSubscriptions();
  }

  // Find one subscription by ID
  async findOneSubscriber(id: string): Promise<Subscribe> {
    const subscription = await this.usersService.findByIdSubscribe(id);
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    return subscription;
  }

  // Update a subscription by ID
  async updateSubscriber(id: string, updateData: Partial<Subscribe>): Promise<Subscribe> {
    const subscription = await this.usersService.findByIdSubscribe(id);
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return this.usersService.updateSubscribe(id, updateData);
  }

  // Delete a subscription by ID
  async deleteSubscriber(id: string): Promise<void> {
    const subscription = await this.usersService.findByIdSubscribe(id);
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    await this.usersService.removeSubscribe(id);
  }

  // Count total subscriptions
  async countSubscribers(): Promise<number> {
    return this.usersService.countSubscriptions();
  }
}
