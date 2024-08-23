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
import { UserCreateDto } from './Dtos/User/UserCreateDtos';
import { User } from './Entity/user.entity';
import { UserUpdateDto } from './Dtos/User/UserUpdateDtos';
import { NameDtos } from './Dtos/User/nameDtos';
import { Nameentitiy } from './Entity/name.entity';
import { AuthGuard } from './auth/auth.guard';
import { Role } from './Authorization/role.enum';
import { Roles } from './Authorization/roles.decorator';
import { RolesGuard } from './Authorization/roles.guard';

@Controller('register')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async register(@Body() userCreateDto: UserCreateDto): Promise<User> {
    return this.appService.createUser(userCreateDto);
  }

  @Post('name')
    @UseGuards(AuthGuard) // Use both guards
    // @Roles(Role.Admin)
        async createName(@Body() nameDtos: NameDtos): Promise<Nameentitiy> {
          return this.appService.createName(nameDtos);
        }

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.appService.findAllUsers();
  }
  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return this.appService.updateUser(userId, userUpdateDto);
  }
}
