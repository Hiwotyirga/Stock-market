import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
// import { UserCreateDto } from './Dtos/User/UserCreateDto';
// import { User } from './Entity/user.entity';

// @Controller('register')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post()
  // async register(@Body() userCreateDto: UserCreateDto): Promise<User> {
  //   return this.appService.createUser(userCreateDto);
  // }

  // @Get('user/:id')
  // async getUser(@Param('id') id: string): Promise<User> {
  //   return this.appService.findOne(id);
  // }

  // @Put(':id')
  // async updateUser(
  //   @Param('id') userId: string,
  //   @Body() userUpdateDto: Partial<UserCreateDto>,
  // ): Promise<Partial<User>> {
  //   return this.appService.updateUser(userId, userUpdateDto);
  // }

  // @Get('')
  // async findAllUser(): Promise<User[]> {
  //   return this.appService.findAlluser();
  // }

  // @Delete('remove/:id')
  // async deleteUser(@Param('id') userid: string) {
  //   return this.appService.deleteUser(userid);
  // }

  // @Get('count')
  // async getUserCount(): Promise<{ count: number }> {
  //   const count = await this.appService.countUsers();
  //   return { count };
  // }
}
