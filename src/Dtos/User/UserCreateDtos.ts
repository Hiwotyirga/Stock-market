import { IsString, IsEmail } from 'class-validator';
// import { Role } from 'src/roles/roles.enum';
import { Role } from 'src/Authorization/role.enum';
import { IsOptional } from 'class-validator';

export class UserCreateDto {
  @IsString()
  name: string;

  @IsEmail() // Ensure email is validated properly
  email: string;

  @IsString()
  password: string;

  @IsOptional() // Make the role optional in DTO
  @IsString()
  rolename?: string; // Use Role enum here to match with User entity
}
