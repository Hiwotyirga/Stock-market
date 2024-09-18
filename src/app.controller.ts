// import { Body, Controller, Get, Param, Patch, Post, Put, ParseIntPipe} from '@nestjs/common';
import { AppService } from './app.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { UserCreateDto } from './Dtos/User/UserCreateDto';
import { User } from './Entity/user.entity';
import { UserUpdateDto } from './Dtos/User/UserUpdateDtos';

import { AuthGuard } from './auth/auth.guard';



@Controller('register')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async register(@Body() userCreateDto: UserCreateDto): Promise<User> {
    return this.appService.createUser(userCreateDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() userUpdateDto: Partial<UserCreateDto> // Allow partial updates
  ): Promise<Partial<User>> {
    try {
      // Call the service method to update the user
      return await this.appService.updateUser(userId, userUpdateDto);
    } catch (error) {
      // Handle known errors or rethrow
      if (error.message.includes('Field cannot be updated')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      if (error.message.includes('Invalid email format')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('user/list')
  async findAllUser(): Promise<User[]>{
    return this.appService.findAlluser()
  }
  @Delete('remove/:id')
  async deleteUser(@Param('id') userid: string){
    return this.appService.deleteUser(userid)
  }

  @Get('count')
  async getUserCount(): Promise<{ count: number }> {
    const count = await this.appService.countUsers();
    return { count };
  }
}
