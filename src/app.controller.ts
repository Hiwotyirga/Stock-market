import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserCreateDto } from './Dtos/User/UserCreateDtos';
import { User } from './Entity/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


@Post()
  async create(@Body() userCreateDto: UserCreateDto): Promise<User>{
    const createUser = await this.appService.create(userCreateDto);
    return createUser;
  }

  @Get()
  async findAllUsers(): Promise<User[]>{
    return this.appService.findAllUsers();
  }
}
