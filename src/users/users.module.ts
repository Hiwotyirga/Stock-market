import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entity/user.entity';
import { Subscribe } from '../Entity/Subscribe.enetity';
import { PaymentMethod } from '../Entity/PaymentMethod.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscribe,PaymentMethod])],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], 
})
export class UsersModule {}
