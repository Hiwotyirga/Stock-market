import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentMethod } from "../Entity/PaymentMethod.entity"; 
import { Subscribe } from "../Entity/Subscribe.enetity";
import { User } from "../Entity/user.entity"; 
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
    @InjectRepository(Subscribe)
    private subscribeRepository: Repository<Subscribe>,

    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>, 
  ) {}

  // Create a new user
  async createUser(userDetails: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userDetails);
    return this.usersRepository.save(user);
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } }); // Adjusted to find by email
  }

  // Find a user by ID
  async findById(userId: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  // Get all users
  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Remove a user by ID
  async removeUser(userId: string): Promise<void> {
    await this.usersRepository.delete(userId);
  }

  // Update a user by ID
  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(userId, updateData);
    return this.findById(userId);
  }

  // Count total number of registered users
  async countUsers(): Promise<number> {
    return this.usersRepository.count();
  }

  // Subscription Management

  // Create a new subscription
  async createSubscribe(subscribeDetails: Partial<Subscribe>): Promise<Subscribe> {
    const subscription = this.subscribeRepository.create(subscribeDetails);
    return this.subscribeRepository.save(subscription);
  }

  // Find a subscription by ID
  async findByIdSubscribe(id: string): Promise<Subscribe | undefined> {
    return this.subscribeRepository.findOne({ where: { id } });
  }

  // Get all subscriptions
  async findAllSubscriptions(): Promise<Subscribe[]> {
    return this.subscribeRepository.find();
  }

  // Remove a subscription by ID
  async removeSubscribe(id: string): Promise<void> {
    await this.subscribeRepository.delete(id);
  }

  // Update a subscription by ID
  async updateSubscribe(id: string, updateData: Partial<Subscribe>): Promise<Subscribe> {
    await this.subscribeRepository.update(id, updateData);
    return this.findByIdSubscribe(id);
  }

  // Count total subscriptions
  async countSubscriptions(): Promise<number> {
    return this.subscribeRepository.count();
  }

  // Create a new payment method
  async createPaymentMethod(paymentMethodDetails: Partial<PaymentMethod>): Promise<PaymentMethod> {
    const paymentMethod = this.paymentMethodRepository.create(paymentMethodDetails);
    return this.paymentMethodRepository.save(paymentMethod);
  }
}
