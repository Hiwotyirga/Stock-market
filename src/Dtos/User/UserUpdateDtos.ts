import { IsString } from 'class-validator';
// import { Role } from 'src/roles/roles.enum';
import { Role } from 'src/Authorization/role.enum';

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
