import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/user.entity';
import { Role } from 'src/Entity/Role.entity';
import { AdminRegister } from 'src/Entity/AdminRegister.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, AdminRegister])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
