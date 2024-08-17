export class AdminRegisterCreateDto {
  name: string;
  password: string;
  email: string;
  roleId: string[]; // Array of role UUIDs as strings
}
