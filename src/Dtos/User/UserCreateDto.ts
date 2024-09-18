import { Optional } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';


export class UserCreateDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
  
  @IsOptional()
  @IsString()
  role: string;
}
