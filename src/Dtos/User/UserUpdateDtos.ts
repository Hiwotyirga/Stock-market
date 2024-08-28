import { IsString } from 'class-validator';


export class UserUpdateDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
  @IsString()
  rolename: string;
}
