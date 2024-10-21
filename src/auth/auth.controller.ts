import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/Entity/user.entity';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ): Promise<User> {
    return this.authService.register(name, email, password, role);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ access_token: string; role: string }> {
    return this.authService.login(email, password);
  }

  @Get('users/count')
  async countUsers(): Promise<{ count: number }> {
    const count = await this.authService.countUsers();
    return { count };
  }

  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string): Promise<void> {
    return this.authService.deleteUser(userId);
  }

  @UseGuards(AuthGuard)
  @Get('users/:id')
  async findOneUser(@Param('id') userId: string): Promise<User> {
    return this.authService.findOneUser(userId);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: Partial<User>,
  ): Promise<User> {
    return this.authService.updateUser(userId, updateUserDto);
  }
}
