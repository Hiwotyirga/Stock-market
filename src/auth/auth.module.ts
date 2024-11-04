import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Ensure this module exists
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entity/user.entity'; 
import { Subscribe } from '../Entity/Subscribe.enetity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:
        'd344bb1b1a0399ce897bc1eedd6ba71652678d6576bb05dddf804d4451d3f17756768c10115b0ebcf447fb61d976e08de9b69362e46212616bb97f20ce2c8744', // Replace with a strong secret
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Subscribe]), // Include Subscribe entity here
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
