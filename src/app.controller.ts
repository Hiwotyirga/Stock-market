// import { Body, Controller, Get, Param, Patch, Post, Put, ParseIntPipe} from '@nestjs/common';
import { AppService } from './app.service';
import { Controller, Param, Body, Put, ParseIntPipe, Post, Get } from '@nestjs/common';
import { UserCreateDto } from './Dtos/User/UserCreateDtos';
import { User } from './Entity/user.entity';
import { UserUpdateDto } from './Dtos/User/UserUpdateDtos';

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
  @Put(':id')
async updateUser(@Param('id') userId: string, @Body() userUpdateDto: UserUpdateDto) {
  return this.appService.updateUser(userId, userUpdateDto);
}

}
