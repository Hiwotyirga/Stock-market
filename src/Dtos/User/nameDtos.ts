import { IsString } from 'class-validator';

export class NameDtos {
  @IsString()
  name: string;
}
