// src/dtos/User/UserLoginDto.ts
import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
