import { IsString } from 'class-validator';
import { Role } from 'src/roles/roles.enum';

export class UserUpdateDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
  @IsString()
  rolename: Role;
}
