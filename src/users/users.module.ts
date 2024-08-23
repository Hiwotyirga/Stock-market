import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entity/user.entity';
import { Profile } from 'src/Entity/profile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Profile])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
