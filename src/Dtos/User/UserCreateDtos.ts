import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserCreateDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  roles?: string; // Rename rolename to roles to match the request payload
}
