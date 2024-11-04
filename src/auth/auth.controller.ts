import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../Entity/user.entity';
import { Subscribe } from '../Entity/Subscribe.enetity';
import { AuthGuard } from './auth.guard';
import { PaymentMethod } from '../Entity/PaymentMethod.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // User Registration
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ): Promise<User> {
    return this.authService.register(name, email, password, role);
  }

  // User Login
  @Post('login')
  async login(
    @Body('name') name: string,
    @Body('password') password: string,
  ): Promise<{ access_token: string; role: string }> { 
    return this.authService.login(name, password);
  }

  // Get User Count
  @Get('users/count')
  async countUsers(): Promise<{ count: number }> {
    const count = await this.authService.countUsers();
    return { count };
  }

  // Get All Users
  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  // Delete User by ID
  @UseGuards(AuthGuard)
  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string): Promise<void> {
    return this.authService.deleteUser(userId);
  }

  // Find One User by ID
  @UseGuards(AuthGuard)
  @Get('users/:id')
  async findOneUser(@Param('id') userId: string): Promise<User> {
    return this.authService.findOneUser(userId);
  }

  // Update User by ID
  @UseGuards(AuthGuard)
  @Put('users/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: Partial<User>,
  ): Promise<User> {
    return this.authService.updateUser(userId, updateUserDto);
  }

  // Subscriber Registration with Payment Method ID
  @Post('subscribers/:paymentMethodId')
  async registerSubscriber(
    @Param('paymentMethodId') paymentMethodId: string,
    @Body() createSubscriberDto: { name: string; email: string; password: string },
  ): Promise<Subscribe> {
    const { name, email, password } = createSubscriberDto;
    return this.authService.registerSubscriber(name, email, password, paymentMethodId);
  }


@Post('login/Subscriber')
async loginSubscriber(
  @Body('name') name: string,
  @Body('password') password: string,
): Promise<{ access_token: string; message: string }> {
  try {
    return await this.authService.loginSubscriber(name, password);
  } catch (error) {
    throw new UnauthorizedException('Invalid subscriber credentials');
  }
}



  // Get All Subscribers
  @UseGuards(AuthGuard)
  @Get('subscribers')
  async getAllSubscribers(): Promise<Subscribe[]> {
    return this.authService.getAllSubscribers();
  }

  // Find One Subscriber by ID
  @UseGuards(AuthGuard)
  @Get('subscribers/:id')
  async findOneSubscriber(@Param('id') id: string): Promise<Subscribe> {
    return this.authService.findOneSubscriber(id);
  }

  // Update Subscriber by ID
  @UseGuards(AuthGuard)
  @Put('subscribers/:id')
  async updateSubscriber(
    @Param('id') id: string,
    @Body() updateData: Partial<Subscribe>,
  ): Promise<Subscribe> {
    return this.authService.updateSubscriber(id, updateData);
  }

  // Delete Subscriber by ID
  @UseGuards(AuthGuard)
  @Delete('subscribers/:id')
  async deleteSubscriber(@Param('id') id: string): Promise<void> {
    return this.authService.deleteSubscriber(id);
  }

  // Count Total Subscribers
  @Get('subscribers/count')
  async countSubscribers(): Promise<{ count: number }> {
    const count = await this.authService.countSubscribers();
    return { count };
  }
}
